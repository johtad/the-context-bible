# Share-link cheat sheet — track every platform separately in GA4

When you post the download link, **use one of these UTM-tagged URLs**
instead of the bare `https://contextscripture.org/app`. The link looks
identical to the visitor, but GA4 will tag every session with the
right source so you can break the dashboard down by platform.

Why this matters: WhatsApp, Instagram, and most "in-app browsers"
**strip the HTTP Referer header**. Without UTM parameters, those clicks
show up as "(direct)" — the same bucket as someone typing the URL
manually. UTMs are how you recover that signal.

---

## Copy-paste links by platform

### Social: Facebook
```
https://contextscripture.org/app?utm_source=facebook&utm_medium=social
```

### Social: Instagram
```
https://contextscripture.org/app?utm_source=instagram&utm_medium=social
```
Variants if you want to separate placements:
- **Bio link:** `?utm_source=instagram&utm_medium=social&utm_content=bio`
- **Story:** `?utm_source=instagram&utm_medium=social&utm_content=story`
- **Reel caption:** `?utm_source=instagram&utm_medium=social&utm_content=reel`
- **Feed post:** `?utm_source=instagram&utm_medium=social&utm_content=feed`

### Social: Threads
```
https://contextscripture.org/app?utm_source=threads&utm_medium=social
```

### Social: X / Twitter
```
https://contextscripture.org/app?utm_source=twitter&utm_medium=social
```

### Social: TikTok (bio or video caption)
```
https://contextscripture.org/app?utm_source=tiktok&utm_medium=social
```

### Social: YouTube (video description / pinned comment)
```
https://contextscripture.org/app?utm_source=youtube&utm_medium=social
```

### Social: LinkedIn
```
https://contextscripture.org/app?utm_source=linkedin&utm_medium=social
```

### Messaging: WhatsApp (broadcast, group, or DM)
```
https://contextscripture.org/app?utm_source=whatsapp&utm_medium=messaging
```

### Messaging: iMessage / SMS
```
https://contextscripture.org/app?utm_source=imessage&utm_medium=messaging
```

### Messaging: Telegram
```
https://contextscripture.org/app?utm_source=telegram&utm_medium=messaging
```

### Email newsletter
```
https://contextscripture.org/app?utm_source=newsletter&utm_medium=email
```
Add `&utm_campaign=launch-may-2026` (or whatever the issue is) to track
individual issues.

### QR code (for flyers, business cards, banners)
```
https://contextscripture.org/app?utm_source=qr&utm_medium=offline
```
Add `&utm_content=flyer-church-pew` or `&utm_content=conference-LA-2026`
to distinguish physical placements.

### Podcast show notes
```
https://contextscripture.org/app?utm_source=podcast&utm_medium=referral
```

### Sermon / talk slide
```
https://contextscripture.org/app?utm_source=sermon&utm_medium=offline
```

---

## Campaign tags

For time-bound pushes — launch week, Easter, Christmas, Bible-in-a-year
challenges — add `&utm_campaign=launch-week` to ANY of the URLs above.
That gives you a single GA4 view of everything tied to one campaign
across all the platforms it ran on.

Examples:
- `?utm_source=instagram&utm_medium=social&utm_campaign=launch-week`
- `?utm_source=whatsapp&utm_medium=messaging&utm_campaign=lent-2026`

---

## Where this shows up in GA4

Once installed, you'll find this data under:

| GA4 location | Shows you |
|---|---|
| Reports → Acquisition → Traffic acquisition | Sessions grouped by `utm_source` / `utm_medium` |
| Reports → Engagement → Events → `store_redirect` | Every time someone landed on `/app` and was redirected. Parameters: `target_store` (ios / android / desktop_view), `referrer`, all UTMs |
| Reports → Engagement → Events → `store_button_click` | Desktop users who clicked App Store / Play Store manually |
| Reports → User → User attributes → Demographic details | Country + city of every visitor |
| Reports → Tech → Tech details | iOS vs Android vs desktop browser breakdown |
| Explore → Free-form report | Build your own — e.g. "store_redirect events by utm_source by country" |

---

## Naming conventions to keep things clean

- Use **lowercase** everywhere (`facebook` not `Facebook`). GA4 treats
  them as different sources otherwise.
- Use **hyphens** in campaign names (`launch-week` not `launch_week`
  or `Launch Week`).
- Stick to a small set of `utm_medium` values:
  - `social` — public social platforms (FB / IG / Threads / X / TikTok / YouTube / LinkedIn)
  - `messaging` — DM platforms (WhatsApp / iMessage / Telegram)
  - `email` — newsletters
  - `offline` — QR codes, flyers, sermons
  - `referral` — podcasts, blogs, partner mentions

Anything not on this list is a stylistic choice — GA4 doesn't care, but
your future self will thank you for the consistency.
