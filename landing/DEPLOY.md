# Deploying landing/ to getboxagent.com

This is a separate Cloudflare Pages project from the widget Worker
(`wrangler.toml` in the repo root is untouched — that's the widget API only).
Pages needs no config file; a direct-upload deploy of this folder is enough.

## First deploy (creates the Pages project)

```
cd "ABD emlak projesi/emlak-widget-global"
npx wrangler pages deploy landing --project-name=getboxagent-site
```

This uploads `landing/` as a static site and prints a `*.pages.dev` URL.

## Point getboxagent.com at it

1. Cloudflare dashboard → Workers & Pages → `getboxagent-site` → Custom domains
2. Add `getboxagent.com` (and `www.getboxagent.com` if wanted)
3. Since the domain is already on Cloudflare (Registrar), DNS records are added automatically — no manual CNAME needed.

## Subsequent updates

Re-run the same `wrangler pages deploy landing --project-name=getboxagent-site`
command after editing any file in `landing/`.
