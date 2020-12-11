import React from "react";
import Comments from "./Comments";
import Moment from "react-moment";
import "moment-timezone";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Voter from "./Voter";
import Button from "@material-ui/core/Button";
import { deleteArticle } from "../api";
import { navigate } from "@reach/router";
import { Link } from "@material-ui/core";
import DeleteMessage from "./DeleteMessage";

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
    marginBottom: 6,
  },
  body: {
    // maxHeight: 50,
    // overflow: "hidden",
  },
});

const FullArticleCard = (props) => {
  const classes = useStyles();
  const article = props.article;
  const { loggedInUser } = props;

  const dateToFormat = article.created_at;

  const handleClick = (event) => {
    console.log("clicked");
    const article = props.article;

    if (window.confirm("Are you sure you wish to delete this article?"))
      deleteArticle(article.article_id).then((res) => {
        navigate("/");
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
              <Link
                style={{ color: "black", textTransform: "capitalize" }}
                to={`/articles/${article.topic}`}
              >
                {article.topic}
              </Link>
              <Typography className={classes.pos} color="textSecondary">
                <h4>
                  {article.comment_count} <FontAwesomeIcon icon="comment" />
                </h4>
              </Typography>
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

              <Voter
                articleId={article.article_id}
                votes={article.votes}
              ></Voter>
            </div>
          </Typography>
          <Typography variant="h6" component="h4">
            {article.title}
          </Typography>

          <Typography className={classes.body} color="textPrimary">
            <p>{article.body}</p>
          </Typography>

          <Typography variant="body2" component="p"></Typography>
        </CardContent>
      </Card>
      <Comments loggedInUser={loggedInUser} id={article.article_id}></Comments>
    </div>
  );
};

export default FullArticleCard;
