import { Container } from "@material-ui/core";
import React, { Fragment } from "react";
import NewsCard from "../NewsCard/NewsCard";
import "./NewsContent.css";
const NewsContent = ({ newsArray, newsResults, loadmore, setloadmore }) => {
  return (
    <Container maxWidth="md">
      <div className="content">

        {newsArray.map((newsItem) => (
          <NewsCard newsItem={newsItem} key={newsItem.title} />
        ))}

        {loadmore <= newsResults && (
          <>
            <hr />
            <button
              className="loadMore"
              onClick={() => setloadmore(loadmore + 20)}
            >
              Load More
            </button>
          </>
        )}
      </div>
    </Container>
  );
};

export default NewsContent;
