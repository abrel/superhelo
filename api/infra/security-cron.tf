resource "aws_security_group" "ecs_cron_tasks" {
  name   = "${var.cron_name}-ecs-tasks-security-group"
  vpc_id = aws_vpc.main.id

  ingress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    protocol    = "-1"
    from_port   = 0
    to_port     = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}
