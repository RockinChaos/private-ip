<h1 align="center">@rockinchaos/private-ip</h1>

<h4 align="center"><b>Check if an IP address is private or reserved.</b></h4>

<p align="center">
  <a href="https://www.npmjs.com/package/@rockinchaos/private-ip"><img alt="Downloads" src="https://img.shields.io/npm/dm/@rockinchaos/private-ip.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/@rockinchaos/private-ip"><img alt="Latest Release" src="https://img.shields.io/npm/v/@rockinchaos/private-ip.svg?style=flat-square"></a>
  <a href="https://github.com/RockinChaos/private-ip/commits"><img alt="Last Commit" src="https://img.shields.io/github/last-commit/RockinChaos/private-ip?style=flat-square"></a>
  <a href="https://github.com/RockinChaos/private-ip/stargazers"><img alt="Stargazers" src="https://img.shields.io/github/stars/RockinChaos/private-ip?style=flat-square"></a>
  <a href="https://github.com/RockinChaos/private-ip/blob/master/LICENSE"><img alt="License: MIT" src="https://img.shields.io/github/license/RockinChaos/private-ip?style=flat-square"></a>
</p>

## 📃 **About**

A fork of [private-ip](https://github.com/frenchbread/private-ip) with security fixes, including SSRF bypass protection for multicast address ranges (`224.0.0.0/4`).

## ⚙️ Installation

```bash
npm install @rockinchaos/private-ip
```
or 
```bash
pnpm add @rockinchaos/private-ip
```

## 🔧 Usage

```js
import is_ip_private from '@rockinchaos/private-ip'

is_ip_private('10.0.0.0')       // => true
is_ip_private('101.0.26.90')    // => false
is_ip_private('not.an.ip.com')  // => undefined
```

## 🛠 Development

### 🐛 Tests
```bash
npm run test
```

### 📦 Build
```bash
npm run build
```

## 🔒 Security

This package addresses an SSRF bypass vulnerability present in the original `private-ip` package where multicast addresses (`224.0.0.0/4`) were not treated as private, allowing attackers to bypass SSRF protections.

> **Warning:** All versions of the original `private-ip` up to and including `3.0.2` are vulnerable. Use `@rockinchaos/private-ip` as a drop-in replacement.

See the full security notice [here](https://github.com/advisories/GHSA-9h3q-32c7-r533).

## ✏️ Authors

Original authors of [private-ip](https://github.com/frenchbread/private-ip):

| Author         | Links                                          |
|----------------|------------------------------------------------|
| Damir Mustafin | [@frenchbread](https://github.com/frenchbread) |
| Sick.Codes     | [@sickcodes](https://github.com/sickcodes)     |
| John Jackson   | [@johnjhacking](https://x.com/johnjhacking)    |
| Nick Sahler    | [@nicksahler](https://github.com/nicksahler)   |

## 📜 License

This project follows the [MIT License](https://github.com/RockinChaos/private-ip/blob/master/LICENSE).

## 🔗 References

- [IANA IPv4 Special Registry](https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry-1.csv)
- [SSRF Bypass Security Notice](https://github.com/advisories/GHSA-9h3q-32c7-r533)
- [Credits](https://github.com/frenchbread/private-ip/blob/master/CREDITS.md)