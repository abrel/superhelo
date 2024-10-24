resource "aws_s3_bucket" "deploy_bucket" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_public_access_block" "public_access" {
  bucket = aws_s3_bucket.deploy_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_ownership_controls" "owner_preferred" {
  bucket = aws_s3_bucket.deploy_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "deploy_bucket_acl" {
  depends_on = [
    aws_s3_bucket_public_access_block.public_access,
    aws_s3_bucket_ownership_controls.owner_preferred,
  ]
  bucket = aws_s3_bucket.deploy_bucket.bucket
  acl    = "public-read"
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.deploy_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.deploy_bucket.arn}/*"
      },
    ]
  })
}

resource "aws_s3_bucket_website_configuration" "deploy_bucket_configuration" {
  bucket = aws_s3_bucket.deploy_bucket.bucket
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "index.html"
  }
}

resource "aws_cloudfront_origin_access_identity" "cloudfront_oia" {
  comment = "example origin access identify"
}

resource "aws_route53_zone" "zone" {
  name          = var.domain
  comment       = ""
  force_destroy = false
  provider      = aws.virginia
}

resource "aws_acm_certificate" "cert" {
  domain_name               = var.webapp_sub_domain
  subject_alternative_names = ["*.${var.webapp_sub_domain}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  provider = aws.virginia
}

resource "aws_route53_record" "cert_validation_record" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.zone.zone_id
  provider        = aws.virginia
}

resource "aws_acm_certificate_validation" "cert_validation" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation_record : record.fqdn]
  provider                = aws.virginia
}


resource "aws_cloudfront_distribution" "website_cdn" {
  enabled = true

  origin {
    origin_id   = "origin-bucket-${aws_s3_bucket.deploy_bucket.id}"
    domain_name = aws_s3_bucket.deploy_bucket.bucket_regional_domain_name

    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "DELETE", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    min_ttl                = "0"
    default_ttl            = "300"
    max_ttl                = "1200"
    target_origin_id       = "origin-bucket-${aws_s3_bucket.deploy_bucket.id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    forwarded_values {
      query_string = true
      cookies {
        forward = "all"
      }
    }

    lambda_function_association {
      event_type = "origin-request"
      lambda_arn = aws_lambda_function.website_rewrite_path.qualified_arn
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
    acm_certificate_arn            = aws_acm_certificate.cert.arn
    ssl_support_method             = "sni-only"
  }

  aliases = [
    var.webapp_sub_domain,
    "www.${var.webapp_sub_domain}"
  ]

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }
}

resource "aws_route53_record" "webapp_sub_domain" {
  zone_id = aws_route53_zone.zone.zone_id
  name    = var.webapp_sub_domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.website_cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_webapp_sub_domain" {
  zone_id = aws_route53_zone.zone.zone_id
  name    = "www.${var.webapp_sub_domain}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.website_cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

