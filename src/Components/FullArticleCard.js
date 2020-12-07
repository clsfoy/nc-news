import React from "react";
import Comments from "./Comments";

const FullArticleCard = (props) => {
  const article = props.article;

  return (
    <div key={article.article_id} className="full-card">
      <h3>{article.title}</h3>
      <p>
        Written by {article.author} on {article.created_at}
      </p>
      <p>{article.body}</p>
      <Comments id={article.article_id}></Comments>
    </div>
  );
};

export default FullArticleCard;
