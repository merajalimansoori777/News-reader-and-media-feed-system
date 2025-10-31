// server.js
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/api/news", async (req, res) => {
  const { q = "general", lang = "en", page = 1 } = req.query;
  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "GNEWS_API_KEY not set in environment" });
  }

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=${encodeURIComponent(lang)}&max=24&page=${encodeURIComponent(page)}&apikey=${apiKey}`;

  try {
    const apiRes = await fetch(url);
    const text = await apiRes.text();

    // If API returns empty body or non-json, forward text for debugging
    if (!text) {
      console.error("Empty response body from GNews");
      return res.status(502).json({ error: "Empty response from GNews" });
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseErr) {
      console.error("Failed to parse GNews JSON:", parseErr, "body:", text);
      return res.status(502).json({ error: "Invalid JSON response from GNews", body: text });
    }

    if (!apiRes.ok) {
      console.error("GNews returned error status:", apiRes.status, data);
      return res.status(apiRes.status).json({ error: data?.message || "GNews error", details: data });
    }

    // Success — forward data
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching from GNews:", err);
    return res.status(500).json({ error: "Failed to fetch from GNews", message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Local API proxy listening at http://localhost:${PORT}`);
});
