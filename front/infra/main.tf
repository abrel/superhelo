terraform {
  required_providers {
    aws = {
      source                = "hashicorp/aws"
      version               = "~> 4.2"
      configuration_aliases = [aws.virginia]
    }
  }

  required_version = ">= 1.1.6"
}

provider "aws" {
  #profile = "superhelo"
  region  = "eu-west-3"
}

provider "aws" {
  alias   = "virginia"
  #profile = "superhelo"
  region  = "us-east-1"
}

