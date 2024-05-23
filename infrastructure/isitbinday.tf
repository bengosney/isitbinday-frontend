resource "dokku_app" "www" {
  app_name = "isitbinday-frontend"

  domains = ["www.${var.domain}"]

  config = {

  }

  #ports = {
  #  80 = {
  #    scheme         = "http"
  #    container_port = 8000
  #  }
  #}
}

output "git-remote" {
  value       = "dokku@${var.hosting_domain}:${dokku_app.www.app_name}"
  description = "Git remote"
  depends_on  = []
}
