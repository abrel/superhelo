resource "aws_ecs_cluster" "main" {
  name = "${var.app_name}-cluster"
}

data "aws_ecr_image" "api" {
  repository_name = var.app_repository_name
  image_tag       = var.tag
}

resource "aws_ecs_task_definition" "app" {
  family                   = "${var.app_name}-app-task"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.fargate_cpu
  memory                   = var.fargate_memory
  container_definitions = jsonencode([
    {
      name : "app",
      image : "${var.ecr_url}/${var.app_repository_name}:${var.tag}@${data.aws_ecr_image.api.image_digest}",
      cpu : var.fargate_cpu,
      memory : var.fargate_memory,
      networkMode : "awsvpc",
      logConfiguration : {
        logDriver : "awslogs",
        options : {
          awslogs-group : "/ecs/${var.app_name}-app",
          awslogs-region : var.aws_region,
          awslogs-stream-prefix : "ecs"
        }
      },
      portMappings : [
        {
          containerPort : var.app_port,
          hostPort : var.app_port
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "main" {
  name            = "${var.app_name}-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.app_count
  launch_type     = "FARGATE"

  network_configuration {
    security_groups = [aws_security_group.ecs_tasks.id]
    subnets          = [aws_subnet.public_subnet_1.id, aws_subnet.public_subnet_2.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.app.id
    container_name   = "app"
    container_port   = var.app_port
  }

  depends_on = [
    aws_alb_listener.front_end_https,
    aws_alb_listener.front_end_http,
    aws_iam_role_policy_attachment.ecs_task_execution_role,
  ]
}
