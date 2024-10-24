terraform {
  backend "s3" {
    bucket = "infra.superhelo.fr"
    #profile = "superhelo"
    key    = "state/api.tfstate"
    region = "eu-west-3"
    # encrypt        = true
    # kms_key_id     = "alias/terraform-bucket-key"
    # dynamodb_table = "terraform-state"
  }
}
