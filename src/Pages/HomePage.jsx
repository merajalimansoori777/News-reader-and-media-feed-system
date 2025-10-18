import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "../Components/NewsItem";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  const [q, setQ] = useState("All");
  const [language, setLanguage] = useState("en"); // GNews supports 'en', 'hi', etc.

  const [searchParams] = useSearchParams();

  useEffect(() => {
    setQ(searchParams.get("q") ?? "All");
    setLanguage(searchParams.get("language") ?? "en");
  }, [searchParams]);

  // Fetch first page of data
  async function getAPIData() {
    try {
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=${q}&lang=${language}&max=24&page=1&apikey=b445839247464771bee592750c03ed56`
      );
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

  // Load more on scroll
  const fetchData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=${q}&lang=${language}&max=24&page=${nextPage}&apikey=b445839247464771bee592750c03ed56`
      );
      const data = await response.json();

      if (data.articles) {
        setArticles(articles.concat(data.articles));
      }
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };

  useEffect(() => {
    getAPIData();
  }, [q, language]);

  return (
    <>
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
    </>
  );
}
