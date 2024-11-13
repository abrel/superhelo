terraform {
  backend "s3" {
    bucket         = "infra.superhelo.fr"
    #profile        = "superhelo"
    key            = "state/front.tfstate"
    region         = "eu-west-3"
  }
}
