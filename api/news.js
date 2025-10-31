// /api/news.js (for Vercel)
export default async function handler(req, res) {
  const { q = "general", lang = "en", page = 1 } = req.query;
  const apiKey = process.env.GNEWS_API_KEY; // set this in Vercel dashboard

  if (!apiKey) {
    return res.status(500).json({ error: "GNEWS_API_KEY not configured" });
  }

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(q)}&lang=${encodeURIComponent(lang)}&max=24&page=${encodeURIComponent(page)}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const ct = response.headers.get("content-type") || "";

    const text = await response.text();
    if (!text) {
      console.error("Empty response from GNews (serverless)");
      return res.status(502).json({ error: "Empty response from GNews" });
    }

    if (!ct.includes("application/json")) {
      // return the raw body for debugging
      console.error("Non-JSON response from GNews:", ct, text);
      return res.status(502).json({ error: "GNews returned non-JSON", contentType: ct, body: text });
    }

    const data = JSON.parse(text);

    if (!response.ok) {
      console.error("GNews returned error:", response.status, data);
      return res.status(response.status).json({ error: data?.message || "Error from GNews", details: data });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Error in serverless API:", err);
    res.status(500).json({ error: "Failed to fetch from GNews", message: err.message });
  }
}
