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
| `frontend/` | Vite wrapper for deploying the survey frontend to Vercel |
| `.env.example` | Environment variable template |
| `railway.toml` | Railway deployment config |
| `vercel.json` | Vercel config that builds only the frontend |

## Deploy (Railway)

1. Push this repo to GitHub
2. Connect to [Railway](https://railway.app) → New Project → Deploy from GitHub
3. Add environment variables from `.env.example`
4. Railway gives you a live URL — update `M2M_API_URL` in the React app

## Deploy Frontend (Vercel)

Deploy the survey frontend to Vercel while keeping this API on Railway.

1. Import `https://github.com/Huve14/m2m-api` into Vercel
2. Keep the repository root as the project root
3. Vercel will use `vercel.json` to build `frontend/` and output `frontend/dist`
4. Add frontend environment variables:
   - `VITE_API_URL=https://m2m-api-production.up.railway.app`
   - `VITE_API_KEY=YOUR_API_KEY`
5. Deploy

The frontend build uses `frontend/src/main.jsx`, which imports the shared survey component from `PnP_FNB_Survey_2026.jsx`.

## Environment Variables

See `.env.example` for all required values:
- `API_KEY` — your secret key (generate with `node -e "console.log(require('crypto').randomBytes(16).toString('hex').toUpperCase())"`)
- `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN` — from [api-console.zoho.com](https://api-console.zoho.com)
- `ZOHO_ORG_ID`, `ZOHO_WORKSPACE_ID`, `ZOHO_VIEW_ID_PNP_FNB` — from Zoho Analytics URLs
- `DATABASE_URL` — Railway PostgreSQL connection string used for concurrency-safe sequential `record_id` values
- `RECORD_ID_START=14119331` — first generated survey `record_id`, the next value after `14119330`
- `REQUIRE_SEQUENTIAL_RECORD_ID=true` — fail submissions if the database counter is unavailable

## Sequential Record IDs

The API now generates `record_id` on the server, starting at `14119331`.
Do not generate this ID in the React survey app. For production, attach Railway PostgreSQL and set `DATABASE_URL`; the API stores the counter in `survey_record_id_counter` and increments it atomically for simultaneous submissions.

## Adding More Surveys

In `server.js`, add to `SURVEY_VIEW_MAP`:
```js
const SURVEY_VIEW_MAP = {
  "PnP FNB Campaign 2026": ZOHO_VIEW_ID_PNP_FNB,
  "Betway Activation 2026": process.env.ZOHO_VIEW_ID_BETWAY,
};
```
