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
  const { loggedInUser, loggedIn } = props;
  const dateToFormat = article.created_at;

  return (
    <>
      <div className="article-card">
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              <div className="article-card-header">
                <div className="author">
                  <p>
                    Written by {article.author}{" "}
                    <Moment fromNow>{dateToFormat}</Moment>
                  </p>
                  <Link
                    style={{ color: "black", textTransform: "capitalize" }}
                    to={`/articles/${article.topic}`}
                  >
                    /{article.topic}
                  </Link>
                </div>
                <div className="votes-comments">
                  <Typography className={classes.pos} color="textSecondary">
                    <p>
                      {article.comment_count} <FontAwesomeIcon icon="comment" />
                    </p>
                  </Typography>
                  {loggedIn ? (
                    <Voter
                      type="article"
                      loggedIn={loggedIn}
                      voteUpdater={props.voteUpdater}
                      articleId={article.article_id}
                      votes={article.votes}
                    ></Voter>
                  ) : (
                    <>
                      <p>{article.votes} votes</p>
                      <p>Log in to vote</p>
                    </>
                  )}
                </div>
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
      </div>
      <Comments
        loggedIn={loggedIn}
        loggedInUser={loggedInUser}
        id={article.article_id}
      ></Comments>
    </>
  );
};

export default FullArticleCard;
