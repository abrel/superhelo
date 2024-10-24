resource "aws_alb" "main" {
  name            = "${var.app_name}-load-balancer"
  subnets         = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
  security_groups = [aws_security_group.lb.id]
}

resource "aws_route53_record" "api" {
  zone_id = var.zone_id
  name    = var.api_url
  type    = "A"

  alias {
    name                   = aws_alb.main.dns_name
    zone_id                = aws_alb.main.zone_id
    evaluate_target_health = true
  }
}

resource "aws_acm_certificate" "cert" {
  domain_name               = var.domain
  subject_alternative_names = ["*.${var.domain}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
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
  zone_id         = var.zone_id
}

resource "aws_acm_certificate_validation" "cert_validation" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation_record : record.fqdn]
}

resource "aws_alb_target_group" "app" {
  name        = "${var.app_name}-target-group"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "30"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "3"
    path                = var.health_check_path
    unhealthy_threshold = "2"
  }
}

# Redirect all traffic from the ALB to the target group
resource "aws_alb_listener" "front_end_https" {
  load_balancer_arn = aws_alb.main.id
  port              = 443
  protocol          = "HTTPS"
  certificate_arn   = aws_acm_certificate.cert.id

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.app.id
  }
}

resource "aws_alb_listener" "front_end_http" {
  load_balancer_arn = aws_alb.main.id
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}
