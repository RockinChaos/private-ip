import { Netmask } from 'netmask'
import ip_regex from 'ip-regex'
import { isIP } from '@chainsafe/is-ip'
import { parseIPv6 } from '@chainsafe/is-ip/parse'
import ipaddr, { IPv4, IPv6 } from 'ipaddr.js'
const { isValid: is_valid, parse } = ipaddr

const PRIVATE_IP_RANGES = [
  '0.0.0.0/8',
  '10.0.0.0/8',
  '100.64.0.0/10',
  '127.0.0.0/8',
  '169.254.0.0/16',
  '172.16.0.0/12',
  '192.0.0.0/24',
  '192.0.0.0/29',
  '192.0.0.8/32',
  '192.0.0.9/32',
  '192.0.0.10/32',
  '192.0.0.170/32',
  '192.0.0.171/32',
  '192.0.2.0/24',
  '192.31.196.0/24',
  '192.52.193.0/24',
  '192.88.99.0/24',
  '192.168.0.0/16',
  '192.175.48.0/24',
  '198.18.0.0/15',
  '198.51.100.0/24',
  '203.0.113.0/24',
  '224.0.0.0/4',
  '240.0.0.0/4',
  '255.255.255.255/32'
]

const NETMASK_RANGES = PRIVATE_IP_RANGES.map(ip_range => new Netmask(ip_range))

function ipv4_check (ip_addr: string) {
  for (const r of NETMASK_RANGES) {
    if (r.contains(ip_addr)) return true
  }
  return false
}

const IPV6_RANGES = [
  '::/128',
  '::1/128',
  '::ffff:0:0/96',
  '::ffff:0:0:0/96',
  '64:ff9b::/96',
  '64:ff9b:1::/48',
  '100::/64',
  '100:0:0:1::/64',
  '2001::/32',
  '2001:2::/48',
  '2001:20::/28',
  '2001:db8::/32',
  '2002::/16',
  '3fff::/20',
  '5f00::/16',
  'fc00::/7',
  'fe80::/10',
  'ff00::/8'
].map(ip_range => ipaddr.IPv6.parseCIDR(ip_range))

function ipv6_check (ip_addr: IPv6) {
  return IPV6_RANGES.some(range => ip_addr.match(range))
}

export default (ip: string): boolean | undefined => {
  if (is_valid(ip)) {
    const parsed = parse(ip)
    if (parsed.kind() === 'ipv4') return ipv4_check((parsed as IPv4).toNormalizedString())
    else if (parsed.kind() === 'ipv6') return ipv6_check(parsed as IPv6)
  } else if (isIP(ip) && ip_regex.v6().test(ip)) {
    const bytes = parseIPv6(ip)
    if (bytes) return ipv6_check(ipaddr.fromByteArray(Array.from(bytes)) as IPv6)
  }
  return undefined
}
