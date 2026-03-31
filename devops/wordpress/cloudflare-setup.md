# Cloudflare Configuration Guide — IssueByte.com

## Account Setup
1. Log in to https://dash.cloudflare.com
2. Select the issuebyte.com zone

---

## SSL/TLS Settings
- **SSL/TLS → Overview** → Set to **Full (strict)**
- **SSL/TLS → Edge Certificates** → Enable:
  - Always Use HTTPS ✓
  - Automatic HTTPS Rewrites ✓
  - HSTS (enable with `max-age=31536000`, include subdomains) ✓

---

## Speed Optimisation
**Speed → Optimization:**
- Auto Minify: ✓ JavaScript, ✓ CSS, ✓ HTML
- Brotli: ✓ On
- Rocket Loader: ✓ On (async JS loading — test with your WordPress plugins first)
- Enhanced HTTP/2 Prioritization: ✓ On (if available on your plan)

---

## Caching
**Caching → Configuration:**
- Caching Level: Standard
- Browser Cache TTL: 1 year
- Always Online: ✓ On (serves cached version if origin is down)

**Cache Rules (Caching → Cache Rules):**

### Rule 1: Bypass cache for WordPress admin and login
- Expression: `(starts_with(http.request.uri.path, "/wp-admin")) or (starts_with(http.request.uri.path, "/wp-login")) or (http.request.uri.path contains "xmlrpc.php")`
- Action: Bypass cache

### Rule 2: Cache static assets aggressively
- Expression: `(http.request.uri.path.extension in {"css" "js" "jpg" "jpeg" "png" "gif" "webp" "svg" "woff" "woff2" "ttf" "ico"})`
- Action: Cache Everything
- Edge Cache TTL: 1 month

---

## Security
**Security → Settings:**
- Security Level: Medium
- Browser Integrity Check: ✓ On
- Email Address Obfuscation: ✓ On
- Hotlink Protection: ✓ On

**Security → WAF (Web Application Firewall):**
- Enable Cloudflare Managed Ruleset
- WordPress-specific rules (search for "WordPress" in ruleset)

**Security → Bots:**
- Bot Fight Mode: ✓ On (free tier)

---

## Firewall Rules

### Rule 1: Block known bad bots
- Expression: `(cf.client.bot) and not (cf.verified_bot_category in {"Search Engine Crawlers" "Monitoring & Analytics"})`
- Action: Block

### Rule 2: Block xmlrpc.php at edge (belt-and-suspenders)
- Expression: `(http.request.uri.path contains "xmlrpc.php")`
- Action: Block

### Rule 3: Rate-limit wp-login.php
- Expression: `(http.request.uri.path contains "wp-login.php")`
- Action: Rate Limit → 5 requests per minute per IP
- (Requires Cloudflare Rate Limiting — check your plan)

---

## Network
- HTTP/3 (QUIC): ✓ On
- 0-RTT Connection Resumption: ✓ On
- gRPC: Off (not needed for WordPress)
- WebSockets: ✓ On

---

## Verification Checklist
- [ ] SSL set to Full (strict)
- [ ] Always Use HTTPS enabled
- [ ] HSTS enabled
- [ ] Auto Minify enabled for HTML, CSS, JS
- [ ] Brotli enabled
- [ ] Rocket Loader tested (check site functions correctly)
- [ ] Browser Cache TTL set to 1 year
- [ ] Admin/login pages bypass cache
- [ ] WAF WordPress rules enabled
- [ ] Bot Fight Mode enabled
- [ ] xmlrpc.php blocked at edge
