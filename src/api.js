import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://is-this-reddit.herokuapp.com/api",
});

export const getTopics = () => {
  return ncNewsApi.get("/topics").then(({ data }) => {
    return data;
  });
};
export const getArticles = (topic, sort_by, order) => {
  return ncNewsApi
    .get("/articles", {
      params: { topic: topic, limit: 100, sort_by, order },
    })
    .then(({ data }) => {
      return data.articles;
    });
};

export const postArticle = (title, body, topic, author) => {
  console.log(title, body, topic, author);
  return ncNewsApi
    .post("/articles", { title, body, topic, author })
    .then((res) => {
      return res.data.newArticle;
    })
    .catch((err) => {});
};

export const deleteArticle = (article_id) => {
  return ncNewsApi.delete(`/articles/${article_id}`).then((res) => {});
};

export const getArticleById = (id) => {
  return ncNewsApi.get(`/articles/${id}`).then(({ data }) => {
    return data.article;
  });
};

export const getCommentsByArticleId = (id, sort_by, order) => {
  return ncNewsApi
    .get(`/articles/${id}/comments`, {
      params: { limit: 100, sort_by, order },
    })
    .then(({ data }) => {
      return data;
    });
};

export const postComment = (comment, id) => {
  console.log("in api");
  return ncNewsApi
    .post(`/articles/${id}/comments`, comment)
    .then(({ data }) => {
      return data.newComment;
    });
};

export const deleteComment = (comment_id) => {
  return ncNewsApi.delete(`/comments/${comment_id}`).then((res) => {});
};

export const upVoteArticle = (articleId, val, type, commentId) => {
  if (type === "article") {
    return ncNewsApi
      .patch(`/articles/${articleId}`, { inc_votes: val })
      .then((data) => {
        return data.data.updatedArticle;
      });
  }

  if (type === "comment") {
    return ncNewsApi
      .patch(`/comments/${commentId}`, { inc_votes: val })
      .then((data) => {
        return data.data.updatedComment;
      });
  }
};

export const getAllUsers = () => {
  return ncNewsApi.get("/users").then((response) => {
    return response.data;
  });
};

export const postTopic = (topic) => {
  return ncNewsApi.post("/topics", topic).then((response) => {
    return response.data.createdTopic;
  });
};

export const upVoteComment = (comment_id, val) => {
  if (val === "up") {
    return ncNewsApi.patch(`/comments/${comment_id}`).then((res) => {
      return res.data;
    });
  }

  if (val === "down") {
    return ncNewsApi.patch(`/comments/${comment_id}`).then((res) => {
      return res.data;
    });
  }
};
