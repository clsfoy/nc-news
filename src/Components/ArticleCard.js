import { Link } from "@reach/router";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "react-moment";
import "moment-timezone";
import { deleteArticle } from "../api";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Voter from "./Voter";

const ArticleCard = (props) => {
  const article = props.article;
  const dateToFormat = article.created_at;
  const { loggedInUser, loggedIn } = props;

  const handleClick = (event) => {
    if (window.confirm("Are you sure you wish to delete this article?"))
      deleteArticle(article.article_id).then((res) => {
        props.articleDeleter();
      });
  };

  return (
    <div>
      <Card
        style={{
          width: "18rem",
          height: "250px",
          marginBottom: "3%",
          marginTop: "1%",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,.2)",
        }}
      >
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "space-around",
            justifyContent: "space-between",
          }}
        >
          <Card.Title>
            <Link
              style={{ color: "black" }}
              to={`/articles/id/${article.article_id}`}
            >
              <p>{article.title}</p>
            </Link>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Written by {article.author} <Moment fromNow>{dateToFormat}</Moment>
          </Card.Subtitle>
          <div className="cardFooter">
            <Link
              style={{ color: "black" }}
              to={`/articles/id/${article.article_id}`}
            >
              {article.comment_count} <FontAwesomeIcon icon="comment" />{" "}
            </Link>
            <Card.Link href="#">
              <Link
                style={{
                  textTransform: "capitalize",
                  color: "black",
                }}
                to={`/articles/${article.topic}`}
              >
                <p>/{article.topic}</p>
              </Link>
            </Card.Link>

            <p>{article.votes} votes</p>
          </div>
        </Card.Body>
        {/* {loggedInUser === article.author ? (
          <div>
            <Button
              onClick={handleClick}
              style={{ background: "none", color: "black", border: "none" }}
            >
              Delete
            </Button>
          </div>
        ) : (
          <></>
        )} */}
      </Card>
    </div>
  );
};

export default ArticleCard;
