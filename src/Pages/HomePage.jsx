// src/Pages/HomePage.jsx

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "../Components/NewsItem";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  const [q, setQ] = useState("general");
  const [language, setLanguage] = useState("en");
  const [searchParams] = useSearchParams();

  // Update category/language from URL
  useEffect(() => {
    setQ(searchParams.get("q") ?? "general");
    setLanguage(searchParams.get("language") ?? "en");
  }, [searchParams]);

  // Fetch first page of data
  async function getAPIData() {
    try {
      const response = await fetch(`/api/news?q=${q}&lang=${language}&page=1`);
      const data = await response.json();

      if (data.articles) {
        setArticles(data.articles);
        setTotalResults(data.totalArticles || data.articles.length);
      } else {
        setArticles([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  }

  // Load more data on scroll
  const fetchData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const response = await fetch(`/api/news?q=${q}&lang=${language}&page=${nextPage}`);
      const data = await response.json();

      if (data.articles) {
        setArticles((prev) => prev.concat(data.articles));
      }
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };

  // Re-fetch when category or language changes
  useEffect(() => {
    setPage(1);
    getAPIData();
  }, [q, language]);

  return (
    <div className="container-fluid my-3">
      <h5 className="background text-center p-2 text-light text-capitalize">
        {q} Articles
      </h5>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchData}
        hasMore={articles.length < totalResults}
        loader={<h4>Loading...</h4>}
      >
        <div className="row">
          {articles.map((item, index) => (
            <NewsItem
              key={index}
              source={item.source.name}
              title={item.title}
              description={item.description}
              url={item.url}
              pic={item.image ?? "/image/noimage.png"}
              date={item.publishedAt}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
