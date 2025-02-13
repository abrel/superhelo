resource "aws_cloudwatch_log_group" "cron_log_group" {
  name              = "/ecs/${var.cron_name}"
  retention_in_days = 30

  tags = {
    Name = "${var.cron_name}-log-group"
  }
}

resource "aws_cloudwatch_log_stream" "cron_log_stream" {
  name           = "${var.cron_name}-log-stream"
  log_group_name = aws_cloudwatch_log_group.cron_log_group.name
}
