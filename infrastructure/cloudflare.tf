resource "cloudflare_record" "www" {
  name            = "www"
  proxied         = true
  type            = "CNAME"
  value           = var.hosting_domain
  zone_id         = var.zoneid
  allow_overwrite = true
}
