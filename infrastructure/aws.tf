resource "aws_amplify_app" "isitbinday" {
  name       = "isitbinday"
  repository = var.repo
}

resource "aws_amplify_branch" "master" {
  app_id      = aws_amplify_app.isitbinday.id
  branch_name = "master"
  environment_variables = {
    REACT_APP_API_URL = "https://api.${var.domain}"
    PUBLIC_URL = "https://www.${var.domain}"
    NODE_ENV = "production"
  }
}

resource "aws_amplify_domain_association" "isitbinday" {
  app_id      = aws_amplify_app.isitbinday.id
  domain_name = var.domain
  wait_for_verification = false

  sub_domain {
    branch_name = aws_amplify_branch.master.branch_name
    prefix      = ""
  }

  sub_domain {
    branch_name = aws_amplify_branch.master.branch_name
    prefix      = "www"
  }
}
