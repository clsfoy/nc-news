import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "react-moment";
import "moment-timezone";

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
const CommentCard = (props) => {
  const classes = useStyles();
  const comment = props.comment;
  const dateToFormat = comment.created_at;
  return (
    <div className="comment-card" key={comment.comment_id}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            <div className="card-header">
              <p>
                Written by {comment.author}{" "}
                <Moment fromNow>{dateToFormat}</Moment>
              </p>
              <div className="vote">
                <p>{comment.votes}</p>
                <div className="icons">
                  <FontAwesomeIcon icon="thumbs-up" />
                  <FontAwesomeIcon icon="thumbs-down" />
                </div>
              </div>
            </div>
          </Typography>
          <p>{comment.body}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentCard;
