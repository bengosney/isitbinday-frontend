resource "dokku_app" "www" {
  app_name = "isitbinday-frontend"

  domains = ["www.${var.domain}"]

  deploy = {
    type = "docker_image"
    docker_image = var.image
  }

  config = {
    REACT_APP_API_URL = "https://api.${var.domain}"
    PUBLIC_URL = "https://www.${var.domain}"
    NODE_ENV = "production"
  }

  ports = {
    80 = {
      scheme         = "http"
      container_port = 80
    }
  }
}

output "git-remote" {
  value       = "dokku@${var.hosting_domain}:${dokku_app.www.app_name}"
  description = "Git remote"
  depends_on  = []
}
