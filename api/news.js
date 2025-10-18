// /api/news.js

export default async function handler(req, res) {
  const { q = "general", lang = "en", page = 1 } = req.query;

  const apiKey = "b445839247464771bee592750c03ed56";
  const url = `https://gnews.io/api/v4/search?q=${q}&lang=${lang}&max=24&page=${page}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error fetching from GNews");
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching from GNews:", error);
    res.status(500).json({ error: "Failed to fetch from GNews" });
  }
}
