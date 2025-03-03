variable "aws_region" {
  description = "The AWS region things are created in"
  default     = "eu-west-3"
}

variable "az_count" {
  description = "Number of AZs to cover in a given region"
  default     = "2"
}

variable "app_name" {
  default = "api"
}

variable "ecr_url" {
  description = "Docker ECR url"
  default     = "381492223258.dkr.ecr.eu-west-3.amazonaws.com"
}

variable "app_repository_name" {
  description = "ECR repository name"
  default     = "api"
}

variable "tag" {
  description = "Latest tag for api"
  default     = "latest"
}

variable "app_port" {
  description = "Port exposed by the docker image to redirect traffic to"
  default     = 3000
}

variable "app_count" {
  description = "Number of docker containers to run"
  default     = 1
}

variable "health_check_path" {
  default = "/"
}

variable "fargate_cpu" {
  description = "Fargate instance CPU units to provision (1 vCPU = 1024 CPU units)"
  default     = 1024
}

variable "fargate_memory" {
  description = "Fargate instance memory to provision (in MiB)"
  default     = 2048
}

variable "zone_id" {
  description = "Route53 Zone ID"
  default     = "Z0975193231ISNKX1A4IY"
}

variable "domain" {
  default = "superhelo.fr"
}

variable "api_url" {
  description = "API URL"
  default     = "api.superhelo.fr"
}

variable "cron_name" {
  default = "cron"
}

variable "cron_repository_name" {
  description = "ECR repository name"
  default     = "cron"
}

variable "fargate_cpu_cron" {
  description = "Fargate instance CPU units to provision (1 vCPU = 1024 CPU units)"
  default     = 256
}

variable "fargate_memory_cron" {
  description = "Fargate instance memory to provision (in MiB)"
  default     = 512
}

