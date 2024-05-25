terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
    dokku = {
      source  = "aliksend/dokku"
      version = "~> 1.0.14"
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

variable "hosting_domain" {
  description = "Hosting domain"
}

variable "zoneid" {
  description = "Cloudflare zone ID"
}

variable "image" {
  description = "Docker image"
}

provider "dokku" {
  ssh_host = var.hosting_domain
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}
