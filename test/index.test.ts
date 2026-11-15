import test from 'ava'
import ipaddr from 'ipaddr.js'
import is_ip_private from '../index.js'

const pub_ips: string[] = [
  '44.37.112.180',
  '46.192.247.73',
  '71.12.102.112',
  '101.0.26.90',
  '111.211.73.40',
  '156.238.194.84',
  '164.101.185.82',
  '223.231.138.242',
  '::1fff:0.0.0.0',
  '::1fff:10.0.0.0',
  '::1fff:0:0.0.0.0',
  '::1fff:0:10.0.0.0',
  '2001:2:ffff:ffff:ffff:ffff:ffff:ffff',
  '64:ff9a::0.0.0.0',
  '64:ff9a::255.255.255.255',
  '99::',
  '99::ffff:ffff:ffff:ffff',
  '101::',
  '101::ffff:ffff:ffff:ffff',
  '2000::',
  '2000::ffff:ffff:ffff:ffff:ffff:ffff',
  '2001:10::',
  '2001:1f:ffff:ffff:ffff:ffff:ffff:ffff',
  '2001:db7::',
  '2001:db7:ffff:ffff:ffff:ffff:ffff:ffff',
  '2001:db9::',
  'fb00::',
  'fbff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
  'fec0::'
]

const priv_ips: string[] = [
  '0.0.0.0',
  '0000.0000.0000.0000',
  '0000.0000',
  '0.0.0.1',
  '0.0.0.7',
  '0.0.0.255',
  '0.0.255.255',
  '0.1.255.255',
  '0.15.255.255',
  '0.63.255.255',
  '0.255.255.254',
  '0.255.255.255',
  '10.0.0.0',
  '10.0.0.1',
  '10.0.0.01',
  '10.0.0.001',
  '10.255.255.254',
  '10.255.255.255',
  '100.64.0.0',
  '100.64.0.1',
  '100.127.255.254',
  '100.127.255.255',
  '127.0.0.0',
  '127.0.0.1',
  '127.0.0.01',
  '127.1',
  '127.0.1',
  '127.000.000.1',
  '127.255.255.254',
  '127.255.255.255',
  '169.254.0.0',
  '169.254.0.1',
  '169.254.255.254',
  '169.254.255.255',
  '172.16.0.0',
  '172.16.0.1',
  '172.16.0.001',
  '172.31.255.254',
  '172.31.255.255',
  '192.0.0.0',
  '192.0.0.1',
  '192.0.0.6',
  '192.0.0.7',
  '192.0.0.8',
  '192.0.0.9',
  '192.0.0.10',
  '192.0.0.11',
  '192.0.0.170',
  '192.0.0.171',
  '192.0.0.254',
  '192.0.0.255',
  '192.0.2.0',
  '192.0.2.1',
  '192.0.2.254',
  '192.0.2.255',
  '192.31.196.0',
  '192.31.196.1',
  '192.31.196.254',
  '192.31.196.255',
  '192.52.193.0',
  '192.52.193.1',
  '192.52.193.254',
  '192.52.193.255',
  '192.88.99.0',
  '192.88.99.1',
  '192.88.99.254',
  '192.88.99.255',
  '192.168.0.0',
  '192.168.0.1',
  '192.168.255.254',
  '192.168.255.255',
  '192.175.48.0',
  '192.175.48.1',
  '192.175.48.254',
  '192.175.48.255',
  '198.18.0.0',
  '198.18.0.1',
  '198.19.255.254',
  '198.19.255.255',
  '198.51.100.0',
  '198.51.100.1',
  '198.51.100.254',
  '198.51.100.255',
  '203.0.113.0',
  '203.0.113.1',
  '203.0.113.254',
  '203.0.113.255',
  '224.0.0.0',
  '226.84.185.150',
  '227.202.96.196',
  '239.255.255.250',
  '240.0.0.0',
  '240.0.0.1',
  '255.0.0.0',
  '255.192.0.0',
  '255.240.0.0',
  '255.254.0.0',
  '255.255.0.0',
  '255.255.255.0',
  '255.255.255.248',
  '255.255.255.254',
  '255.255.255.255',
  '::',
  '::1',
  '::ffff:0.0.0.0',
  '::ffff:255.255.255.255',
  '64:ff9b::0.0.0.0',
  '64:ff9b::16.10.11.1',
  '64:ff9b::255.255.255.255',
  '100::',
  '100::0:0:0:0',
  '100::1:eabc:0:2',
  '100::ffff:ffff:ffff:ffff',
  '2001::',
  '2001::a:b:c',
  '2001::ffff:ffff:ffff:ffff:ffff:ffff',
  '2001:20::',
  '2001:20::a:b:c',
  '2001:2f::a:b:c',
  '2001:2f:ffff:ffff:ffff:ffff:ffff:ffff',
  '2001:db8::',
  '2001:db8::1',
  '2001:db8:abc::1',
  '2001:db8:ffff:ffff:ffff:ffff:ffff:ffff',
  '2002::',
  '2002::1',
  '2002::abc:1',
  '2002:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
  'fe80::',
  'fe80::1',
  'fe80::abc:1',
  'febf:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
  'fc00::',
  'fc00::1',
  'fc00::abc:1',
  'fdff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
  'ff00::',
  'ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff',
  '2130706433',
  '0x7f000001',
]

const invalid_ips: string[] = [
  '100::ffff::',
  '::ffff:0.0.255.255.255',
  '::ffff:0.255.255.255.255',
]

pub_ips.forEach(ip_addr => test(`IP ${ip_addr} should be public`, t => t.false(is_ip_private(ip_addr))))

priv_ips.forEach(ip_addr => test(`IP ${ip_addr} should be private`, t => t.true(is_ip_private(ip_addr))))

invalid_ips.forEach(ip_addr => test(`IP ${ip_addr} should be undefined`, t => t.is(is_ip_private(ip_addr), undefined)))

for (const [addresses, expected] of [[pub_ips, false], [priv_ips, true]] as const) {
  for (const address of addresses.filter(ip => ip.includes(':'))) {
    test(`Equivalent IPv6 spellings of ${address} retain classification`, t => {
      const parsed = ipaddr.parse(address)
      const normalized = parsed.toNormalizedString()
      const padded = normalized.split(':').map(part => part.padStart(4, '0')).join(':')
      for (const variant of [normalized, padded, padded.toUpperCase(), address.toUpperCase(), address + '%eth0', address + '%eth-0']) {
        t.is(is_ip_private(variant), expected, variant)
      }
    })
  }
}

for (const address of ['::ffff:0:127.0.0.1', '::ffff:0:7f00:1', '::ffff:8.8.8.8', '64:ff9b::808:808']) {
  test(`Embedded IPv4 range ${address} remains private`, t => t.true(is_ip_private(address)))
}

for (const address of ['::2', '::fffe:ffff:ffff', '::1:0:0:0', '::fffe:ffff:ffff:ffff', '::ffff:1:0:0', '64:ff9b::1:0:0', '100:0:0:2::', '2001:1::', '2001:30::', '2003::', 'fe7f:ffff:ffff:ffff:ffff:ffff:ffff:ffff']) {
  test(`IPv6 address outside private ranges ${address} remains public`, t => t.false(is_ip_private(address)))
}

for (const address of ['::ffff:999.0.0.1', '2001:db8::gggg', '::1/128', '::1 trailing', '[::1]', '']) {
  test(`Malformed address ${JSON.stringify(address)} remains undefined`, t => t.is(is_ip_private(address), undefined))
}


const special_ipv6_ranges = [
  ['64:ff9b:1::', '64:ff9b:1:ffff:ffff:ffff:ffff:ffff', '64:ff9b:0:ffff:ffff:ffff:ffff:ffff', '64:ff9b:2::'],
  ['100:0:0:1::', '100:0:0:1:ffff:ffff:ffff:ffff', '100:0:0:0:ffff:ffff:ffff:ffff', '100:0:0:2::'],
  ['2001:2::', '2001:2:0:ffff:ffff:ffff:ffff:ffff', '2001:1:ffff:ffff:ffff:ffff:ffff:ffff', '2001:2:1::'],
  ['3fff::', '3fff:fff:ffff:ffff:ffff:ffff:ffff:ffff', '3ffe:ffff:ffff:ffff:ffff:ffff:ffff:ffff', '3fff:1000::'],
  ['5f00::', '5f00:ffff:ffff:ffff:ffff:ffff:ffff:ffff', '5eff:ffff:ffff:ffff:ffff:ffff:ffff:ffff', '5f01::']
]

for (const [first, last, before, after] of special_ipv6_ranges) {
  test(`Special-use IPv6 range starting at ${first} is private`, t => {
    for (const address of [first, last]) {
      const padded = ipaddr.parse(address).toNormalizedString().split(':').map(part => part.padStart(4, '0')).join(':')
      for (const variant of [address, padded, padded.toUpperCase(), address + '%eth0', address + '%eth-0']) {
        t.true(is_ip_private(variant), variant)
      }
    }
    t.is(is_ip_private(before), first === '100:0:0:1::', before)
    t.false(is_ip_private(after), after)
  })
}

test('Local-use translation and benchmarking examples are private', t => {
  t.true(is_ip_private('64:ff9b:1::127.0.0.1'))
  t.true(is_ip_private('64:ff9b:1::7f00:1'))
  t.true(is_ip_private('2001:2::1'))
  t.true(is_ip_private('3fff::1'))
  t.true(is_ip_private('5f00::1'))
})
