# M2M Survey API

Replacement for fm.m2tmax.com — a Node.js/Express API that accepts survey submissions and writes directly into Zoho Analytics.

## Endpoint

```
POST /api/form_master_uploads/zoho?X-Api-Key=YOUR_KEY&survey=PnP%20FNB%20Campaign%202026
```

## Files

| File | Purpose |
|---|---|
| `server.js` | Express API server |
| `PnP_FNB_Survey_2026.jsx` | React survey app (drop into Vite project) |
| `.env.example` | Environment variable template |
| `railway.toml` | Railway deployment config |

## Deploy (Railway)

1. Push this repo to GitHub
2. Connect to [Railway](https://railway.app) → New Project → Deploy from GitHub
3. Add environment variables from `.env.example`
4. Railway gives you a live URL — update `M2M_API_URL` in the React app

## Environment Variables

See `.env.example` for all required values:
- `API_KEY` — your secret key (generate with `node -e "console.log(require('crypto').randomBytes(16).toString('hex').toUpperCase())"`)
- `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN` — from [api-console.zoho.com](https://api-console.zoho.com)
- `ZOHO_ORG_ID`, `ZOHO_WORKSPACE_ID`, `ZOHO_VIEW_ID_PNP_FNB` — from Zoho Analytics URLs

## Adding More Surveys

In `server.js`, add to `SURVEY_VIEW_MAP`:
```js
const SURVEY_VIEW_MAP = {
  "PnP FNB Campaign 2026": ZOHO_VIEW_ID_PNP_FNB,
  "Betway Activation 2026": process.env.ZOHO_VIEW_ID_BETWAY,
};
```
