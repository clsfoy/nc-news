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

export const postArticle = (article) => {
  return ncNewsApi
    .post("/articles", article)
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
  return ncNewsApi
    .post(`/articles/${id}/comments`, comment)
    .then(({ data }) => {
      return data.newComment;
    });
};

export const deleteComment = (comment_id) => {
  return ncNewsApi.delete(`/comments/${comment_id}`).then((res) => {
    console.log(res);
  });
};

export const upVoteArticle = (articleId, val) => {
  if (val === "up") {
    return ncNewsApi
      .patch(`/articles/${articleId}`, { inc_votes: 1 })
      .then((res) => {});
  }
  if (val === "down") {
    return ncNewsApi
      .patch(`/articles/${articleId}`, { inc_votes: -1 })
      .then((res) => {});
  }
};

export const getAllUsers = () => {
  return ncNewsApi.get("/users").then((response) => {
    return response.data;
  });
};

export const postTopic = (topic) => {
  console.log(topic);
  return ncNewsApi.post("/topics", topic).then((response) => {
    return response.data.createdTopic;
  });
};

export const upVoteComment = (comment_id, val) => {
  console.log(comment_id);

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
