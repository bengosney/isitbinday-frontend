
locals {
  verification_dns_record = split(" ", aws_amplify_domain_association.isitbinday.certificate_verification_dns_record)
}

resource "cloudflare_record" "amplify_verification" {
  zone_id = var.zoneid
  name    = local.verification_dns_record[0]
  value   = local.verification_dns_record[2]
  type    = local.verification_dns_record[1]
  proxied = false
  comment = "DNS verification for Amplify"
}

resource "cloudflare_record" "subdomain" {
  for_each = { for s in aws_amplify_domain_association.isitbinday.sub_domain : s.prefix => split(" ", s.dns_record) }

  zone_id         = var.zoneid
  name            = (each.value[0] != "" ? each.value[0] : "@")
  value           = each.value[2]
  type            = each.value[1]
  proxied         = false
  allow_overwrite = true
  comment         = "DNS record for Amplify"
}
