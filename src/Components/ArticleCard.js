import { Link } from "@reach/router";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "react-moment";
import "moment-timezone";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Voter from "./Voter";
import Button from "@material-ui/core/Button";
import { deleteArticle } from "../api";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    border: "solid #908C98",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 1,
  },
  body: {
    maxHeight: 50,
    // overflow: "hidden",
  },
  articleTitle: {
    color: "black",
  },
});

const ArticleCard = (props) => {
  const classes = useStyles();
  const article = props.article;
  const dateToFormat = article.created_at;
  const { loggedInUser } = props;

  const handleClick = (event) => {
    console.log("clicked");
    console.log(props);

    if (window.confirm("Are you sure you wish to delete this article?"))
      deleteArticle(article.article_id).then((res) => {
        props.articleDeleter();
        // navigate("/");
      });
  };
  return (
    <div className="article-card">
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            <div className="card-header">
              <p>
                Written by {article.author}{" "}
                <Moment fromNow>{dateToFormat}</Moment>
              </p>
              <Link to={`/articles/${article.topic}`}>{article.topic}</Link>
              {loggedInUser === article.author ? (
                <div>
                  <Button
                    onClick={handleClick}
                    style={{ background: "#eb5c44" }}
                  >
                    Delete
                  </Button>
                </div>
              ) : (
                <div>
                  <Button onClick={handleClick} disabled={true}>
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </Typography>
          <Typography color="textPrimary" variant="h6" component="h4">
            <Link to={`/articles/id/${article.article_id}`}>
              {article.title}
            </Link>
          </Typography>

          {/* <Typography className={classes.body} color="textPrimary">
            <p>{article.body}</p>
          </Typography> */}
          <Typography className={classes.pos} color="textSecondary">
            <h4>
              <Link
                style={{ color: "black" }}
                to={`/articles/id/${article.article_id}`}
              >
                {article.comment_count} <FontAwesomeIcon icon="comment" />{" "}
              </Link>
            </h4>
            <Voter articleId={article.article_id} votes={article.votes}></Voter>
          </Typography>
          <Typography variant="body2" component="p"></Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleCard;
