resource "aws_s3_bucket" "assets_bucket" {
  bucket = var.assets_bucket_name
}

resource "aws_s3_bucket_cors_configuration" "assets_bucket_cors" {
  bucket = aws_s3_bucket.assets_bucket.id

  cors_rule {
    allowed_methods = ["GET"]
    allowed_origins = ["*"]
    allowed_headers = ["*"]
  }
}

resource "aws_s3_bucket_public_access_block" "assets_restricted_access" {
  bucket = aws_s3_bucket.assets_bucket.id

  block_public_acls       = true
  block_public_policy     = false
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_ownership_controls" "assets_owner_preferred" {
  bucket = aws_s3_bucket.assets_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_cloudfront_origin_access_identity" "assets_oai" {
  comment = "Origin Access Identity for CloudFront to access assets S3 bucket"
}


resource "aws_s3_bucket_policy" "assets_bucket_policy" {
  bucket = aws_s3_bucket.assets_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
       {
        Sid       = "AllowCloudFrontAccess",
        Effect    = "Allow",
        Principal = {
          "AWS": "${aws_cloudfront_origin_access_identity.assets_oai.iam_arn}"
        }
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.assets_bucket.arn}/*"
      },
      {
        Sid       = "RestrictedPutObject",
        Effect    = "Allow",
        Principal = {
          "AWS": "${aws_cloudfront_origin_access_identity.assets_oai.iam_arn}"
        },
        Action    = "s3:PutObject",
        Resource  = "${aws_s3_bucket.assets_bucket.arn}/*"
      }
    ]
  })
}


resource "aws_cloudfront_distribution" "assets_cdn" {
  enabled = true

  origin {
    origin_id   = "origin-bucket-${aws_s3_bucket.assets_bucket.id}"
    domain_name = aws_s3_bucket.assets_bucket.bucket_regional_domain_name

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.assets_oai.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "DELETE", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    min_ttl                = "0"
    default_ttl            = "300"
    max_ttl                = "1200"
    target_origin_id       = "origin-bucket-${aws_s3_bucket.assets_bucket.id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    forwarded_values {
      query_string = true
      cookies {
        forward = "all"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = false
    acm_certificate_arn            = aws_acm_certificate.cert.arn
    ssl_support_method             = "sni-only"
  }
}
