import { Link } from "@reach/router";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ArticleCard = (props) => {
  const article = props.article;

  return (
    <div className="article-card">
      <div className="card-header">
        <p>
          Written by {article.author} on {article.created_at}
        </p>
        <div className="vote">
          <p>{article.votes}</p>
          <FontAwesomeIcon icon="arrow-up" />
          <FontAwesomeIcon icon="arrow-down" />
        </div>
        <p>Comments: {article.comment_count}</p>
      </div>
      <div className="card-body">
        <Link to={`/articles/id/${article.article_id}`}>
          <h4>{article.title}</h4>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
