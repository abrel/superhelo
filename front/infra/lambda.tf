resource "aws_iam_role" "lambda_edge_role" {
  name = "iam_for_lambda_edge"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "lambda.amazonaws.com",
          "edgelambda.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/${var.lambda_name}/"
  output_path = "${path.module}/${var.lambda_name}.zip"
}

resource "aws_lambda_function" "website_rewrite_path" {
  function_name = var.lambda_name
  filename      = "${path.module}/${var.lambda_name}.zip"
  handler       = "handler.path_rewrite"
  runtime       = "nodejs18.x"
  provider      = aws.virginia
  publish       = true
  role          = aws_iam_role.lambda_edge_role.arn
}
