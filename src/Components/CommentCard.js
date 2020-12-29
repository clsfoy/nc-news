import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import "moment-timezone";
import { deleteComment } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Voter from "./Voter";

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
  const commentDeleter = props.commentDeleter;
  const dateToFormat = comment.created_at;
  const { loggedInUser, loggedIn } = props;

  const handleClick = () => {
    if (window.confirm("Are you sure you wish to delete this comment?"))
      deleteComment(comment.comment_id).then((res) => {
        commentDeleter();
      });
  };

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
              <div className="author">
                <p>
                  Written by {comment.author}{" "}
                  <Moment fromNow>{dateToFormat}</Moment>
                </p>
                {loggedInUser === comment.author ? (
                  <button class="btn" onClick={handleClick}>
                    <FontAwesomeIcon className="delete-btn" icon="trash-alt" />
                  </button>
                ) : (
                  <p></p>
                )}
                {loggedIn ? (
                  <Voter
                    voteUpdater={props.voteUpdater}
                    comment_id={comment.comment_id}
                    votes={comment.votes}
                    type="comment"
                  ></Voter>
                ) : (
                  <>
                    <p>{comment.votes} votes</p> <p>Please log in to vote</p>{" "}
                  </>
                )}
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
