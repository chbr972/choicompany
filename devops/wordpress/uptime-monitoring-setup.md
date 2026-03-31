# Uptime Monitoring Setup — IssueByte.com

## UptimeRobot (Free Tier — Recommended)

### Setup Steps
1. Create a free account at https://uptimerobot.com
2. Click **"+ Add New Monitor"**
3. Configure:
   - Monitor Type: **HTTP(s)**
   - Friendly Name: `IssueByte.com`
   - URL: `https://issuebyte.com`
   - Monitoring Interval: **5 minutes** (max on free tier)
4. Under **Alert Contacts**, add your email address
5. Save the monitor

### Additional Monitors to Add
| Monitor | URL | Purpose |
|---|---|---|
| IssueByte Homepage | https://issuebyte.com | Main site |
| IssueByte Login | https://issuebyte.com/wp-login.php | Confirm WP admin accessible |
| IssueByte RSS | https://issuebyte.com/feed/ | Confirm RSS for readers |

### Free Tier Limits
- 50 monitors
- 5-minute check interval
- Email/Slack alerts
- 2 months of logs

### Status Page (Optional)
- Create a public status page to show uptime history
- URL format: `https://status.uptimerobot.com/XXXXXXXX`
- Link from issuebyte.com footer for transparency

---

## Alternative: Better Stack (Free Tier)

For more detailed incident management:
1. Sign up at https://betterstack.com/uptime
2. Free tier: 10 monitors, 3-minute interval
3. Includes on-call escalation and incident timelines

---

## Alerting Configuration

### Email Alerts
- Add primary admin email
- Add secondary email (backup admin) if available
- Set alert delay: **0 minutes** (alert immediately on downtime)

### Escalation
- First alert: primary email (immediate)
- If downtime > 15 minutes: check Hostinger hPanel for server status
- Check Cloudflare status at https://www.cloudflarestatus.com
- Check UptimeRobot status page for false positive ruling

---

## Monthly Review
Run this check monthly:
1. Review UptimeRobot dashboard for uptime percentage (target: 99.9%+)
2. Check average response time (target: < 500ms TTFB)
3. Review any downtime incidents and root causes
4. Verify backup restore is still functional
