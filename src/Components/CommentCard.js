import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import "moment-timezone";
import DeleteComment from "./DeleteComment";
import CommentVoter from "./CommentVoter";

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
    maxHeight: 50,
    overflow: "hidden",
  },
});
const CommentCard = (props) => {
  const classes = useStyles();
  const comment = props.comment;
  const dateToFormat = comment.created_at;
  const { loggedInUser } = props;

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
              {loggedInUser === comment.author ? (
                <DeleteComment
                  loggedInUser={loggedInUser}
                  article_id={props.article_id}
                  id={comment.comment_id}
                ></DeleteComment>
              ) : (
                <p></p>
              )}
              <h4>{comment.votes}</h4>
              <CommentVoter
                voteUpdater={props.voteUpdater}
                comment_id={comment.comment_id}
                votes={comment.votes}
              ></CommentVoter>
            </div>
          </Typography>
          <p>{comment.body}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentCard;
