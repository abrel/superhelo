resource "aws_ecs_cluster" "cron" {
  name = "${var.cron_name}-cluster"
}

data "aws_ecr_image" "cron" {
  repository_name = var.cron_repository_name
  image_tag       = var.tag
}

resource "aws_ecs_service" "cron" {
  name            = "${var.cron_name}-service"
  cluster         = aws_ecs_cluster.cron.id
  task_definition = aws_ecs_task_definition.cron.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    security_groups = [aws_security_group.ecs_cron_tasks.id]
    subnets = [
      aws_subnet.public_subnet_1.id,
      aws_subnet.public_subnet_2.id
    ]
    assign_public_ip = true
  }
}

resource "aws_ecs_task_definition" "cron" {
  family                   = "${var.cron_name}-cron-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.fargate_cpu_cron
  memory                   = var.fargate_memory_cron
  container_definitions = jsonencode([
    {
      name : "app",
      image : "${var.ecr_url}/${var.cron_repository_name}:${var.tag}@${data.aws_ecr_image.cron.image_digest}",
      cpu : var.fargate_cpu_cron,
      memory : var.fargate_memory_cron,
      networkMode : "awsvpc",
      logConfiguration : {
        logDriver : "awslogs",
        options : {
          awslogs-group : "/ecs/${var.cron_name}",
          awslogs-region : var.aws_region,
          awslogs-stream-prefix : "ecs"
        }
      }
    }
  ])
}
