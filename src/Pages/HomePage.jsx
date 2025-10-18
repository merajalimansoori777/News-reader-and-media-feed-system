import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "../Components/NewsItem";

export default function HomePage() {
  let [page,setPage] = useState(1)
  let [articles, setArticles] = useState([]);
  let [totalResults, setTotalResults] = useState(0);

  let [q, setQ] = useState("All");
  let [language, setLanguage] = useState("hi");

  let [searchParams] = useSearchParams();

  useEffect(() => {
    setQ(searchParams.get("q") ?? "All");
    setLanguage(searchParams.get("language") ?? "hi");
  }, [searchParams]);

  async function getAPIData() {
    let response = await fetch(
      `https://newsapi.org/v2/everything?q=${q}&pageSize=24&page=1&sortBy=publishedAt&language=${language}&apiKey=bab78c2c1c2846af9ffa85bc863e826d`
    );

    response = await response.json();

    if (response.status === "ok") {
      setArticles(response.articles);
      setTotalResults(response.totalResults);
    }
  }

  let fetchData = async() =>{
     setPage(page+1)
     let response = await fetch(
      `https://newsapi.org/v2/everything?q=${q}&pageSize=24&page=${page}&sortBy=publishedAt&language=${language}&apiKey=bab78c2c1c2846af9ffa85bc863e826d`
    );

    response = await response.json();

    if (response.status === "ok") {
      setArticles(articles.concat(response.articles));
    
    }
  }

  useEffect(() => {
    getAPIData();
  }, [q, language]);
  console.log("Articles:", articles);

  return (
    <>
      <div className="container-fluid my-3">
        <h5 className="background text-center p-2 text-light text-capitalize">
          {q} Articles
        </h5>

        <InfiniteScroll
          dataLength={articles.length} //This is important field to render the next data
          next={fetchData}
          hasMore={articles.length<totalResults}
          loader={<h4>Loading...</h4>}
          
        >
          <div className="row">
            {articles.map((item, index) => {
              return (
                <NewsItem
                  key={index}
                  source={item.source.name}
                  title={item.title}
                  description={item.description}
                  url={item.url}
                  pic={item.urlToImage ?? "/image/noimage.png"}
                  date={item.publishedAt}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}
