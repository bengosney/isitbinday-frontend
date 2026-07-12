terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    encrypt = true
  }
}

variable "domain" {
  description = "Domain (no www)"
}

variable "repo" {
  description = "Git repository"
}

variable "cloudflare_api_token" {
  description = "Cloudflare API token"
}

variable "zoneid" {
  description = "Cloudflare zone ID"
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}
