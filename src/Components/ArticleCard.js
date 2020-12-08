import { Link } from "@reach/router";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "react-moment";
import "moment-timezone";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
    maxHeight: 50,
    overflow: "hidden",
  },
});

const ArticleCard = (props) => {
  const classes = useStyles();

  const article = props.article;
  const dateToFormat = article.created_at;
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
              <div className="vote">
                <p>{article.votes}</p>
                <div className="icons">
                  <FontAwesomeIcon icon="thumbs-up" />
                  <FontAwesomeIcon icon="thumbs-down" />
                </div>
              </div>
            </div>
          </Typography>
          <Typography variant="h6" component="h4">
            <Link to={`/articles/id/${article.article_id}`}>
              {article.title}
            </Link>
          </Typography>

          <Typography className={classes.body} color="textPrimary">
            <p>{article.body}</p>
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            <p>
              {article.comment_count} <FontAwesomeIcon icon="comment" />{" "}
            </p>
          </Typography>
          <Typography variant="body2" component="p"></Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleCard;
