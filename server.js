// ─────────────────────────────────────────────────────────────────
//  M2M Survey API  –  Replacement for fm.m2tmax.com
//  POST /api/form_master_uploads/zoho?X-Api-Key=<KEY>&survey=<NAME>
//  Node.js + Express  |  Deploy on Railway / Render / VPS
// ─────────────────────────────────────────────────────────────────
const express  = require("express");
const cors     = require("cors");
const axios    = require("axios");
require("dotenv").config();

const app = express();

// ── Middleware ────────────────────────────────────────────────────
app.use(cors({ origin: "*" }));          // tighten to your Vercel domain in prod
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ── Config (from .env) ────────────────────────────────────────────
const {
  API_KEY,              // your secret key → replaces E08F963B246E73D654B3D28397518961
  ZOHO_CLIENT_ID,
  ZOHO_CLIENT_SECRET,
  ZOHO_REFRESH_TOKEN,
  ZOHO_ORG_ID,
  ZOHO_WORKSPACE_ID,
  // Map survey names → Zoho View IDs
  ZOHO_VIEW_ID_PNP_FNB,     // PnP FNB Campaign 2026 table
} = process.env;

const PORT = process.env.PORT || 3000;

// ── Survey → View ID lookup ───────────────────────────────────────
const SURVEY_VIEW_MAP = {
  "PnP FNB Campaign 2026":  ZOHO_VIEW_ID_PNP_FNB,
  // add more surveys here:
  // "Betway Activation 2026": process.env.ZOHO_VIEW_ID_BETWAY,
};

// ── Zoho token cache (refresh_token → access_token, lasts 1hr) ───
let _zohoToken     = null;
let _zohoTokenExp  = 0;

async function getZohoAccessToken() {
  if (_zohoToken && Date.now() < _zohoTokenExp) return _zohoToken;

  const res = await axios.post(
    "https://accounts.zoho.com/oauth/v2/token",
    new URLSearchParams({
      refresh_token: ZOHO_REFRESH_TOKEN,
      client_id:     ZOHO_CLIENT_ID,
      client_secret: ZOHO_CLIENT_SECRET,
      grant_type:    "refresh_token",
    }).toString(),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  if (!res.data.access_token) {
    throw new Error("Zoho token refresh failed: " + JSON.stringify(res.data));
  }

  _zohoToken    = res.data.access_token;
  _zohoTokenExp = Date.now() + (res.data.expires_in - 60) * 1000; // 1 min buffer
  return _zohoToken;
}

// ── POST /api/form_master_uploads/zoho ────────────────────────────
app.post("/api/form_master_uploads/zoho", async (req, res) => {
  try {
    // 1. Validate API key
    const apiKey  = req.query["X-Api-Key"] || req.headers["x-api-key"];
    const survey  = req.query["survey"]    || req.body?.survey;

    if (!apiKey || apiKey !== API_KEY) {
      return res.status(401).json({ status: false, message: "Invalid API key" });
    }
    if (!survey) {
      return res.status(400).json({ status: false, message: "survey param required" });
    }

    // 2. Resolve the Zoho view ID for this survey
    const viewId = SURVEY_VIEW_MAP[survey];
    if (!viewId) {
      return res.status(400).json({
        status: false,
        message: `Unknown survey: "${survey}". Check SURVEY_VIEW_MAP in server.js`,
      });
    }

    // 3. Build the column data from the request body
    //    Accepts flat JSON body – all keys map directly to Zoho column names
    const columns = { ...req.body };
    delete columns.survey; // don't write the survey param as a column

    // Ensure timestamp exists
    if (!columns.timestamp) {
      columns.timestamp = new Date()
        .toISOString()
        .replace("T", " ")
        .substring(0, 19);
    }

    // 4. Get a fresh Zoho access token
    const token = await getZohoAccessToken();

    // 5. POST the row to Zoho Analytics REST API v2
    const zohoRes = await axios.post(
      `https://analyticsapi.zoho.com/restapi/v2/workspaces/${ZOHO_WORKSPACE_ID}/views/${viewId}/rows`,
      new URLSearchParams({
        CONFIG: JSON.stringify({ columns }),
      }).toString(),
      {
        headers: {
          Authorization:      `Zoho-oauthtoken ${token}`,
          "ZANALYTICS-ORGID": ZOHO_ORG_ID,
          "Content-Type":     "application/x-www-form-urlencoded",
        },
      }
    );

    if (zohoRes.data?.data) {
      return res.json({
        status:  true,
        message: "Row added successfully",
        data:    zohoRes.data.data,
      });
    }

    // Zoho returned an error
    return res.status(500).json({
      status:  false,
      message: "Zoho API error",
      detail:  zohoRes.data,
    });

  } catch (err) {
    console.error("[survey-api] error:", err?.response?.data || err.message);
    return res.status(500).json({
      status:  false,
      message: err?.response?.data?.data?.errorMessage || err.message,
    });
  }
});

// ── GET /api/form_master_uploads/zoho  (health / test) ───────────
app.get("/api/form_master_uploads/zoho", (req, res) => {
  const apiKey = req.query["X-Api-Key"] || req.headers["x-api-key"];
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ status: false, message: "Invalid API key" });
  }
  res.json({
    status:  true,
    message: "M2M Survey API is running",
    surveys: Object.keys(SURVEY_VIEW_MAP),
    version: "1.0.0",
  });
});

// ── Health check (no auth) ────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ ok: true }));

// ── Start ─────────────────────────────────────────────────────────
app.listen(PORT, () =>
  console.log(`M2M Survey API running on port ${PORT}`)
);
