import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://is-this-reddit.herokuapp.com/api",
});

export const getTopics = () => {
  return ncNewsApi.get("/topics").then(({ data }) => {
    return data;
  });
};
export const getArticles = (topic) => {
  return ncNewsApi
    .get("/articles", { params: { topic: topic, limit: 100 } })
    .then(({ data }) => {
      return data;
    });
};

export const getArticleById = (id) => {
  return ncNewsApi.get(`/articles/${id}`).then(({ data }) => {
    return data;
  });
};

export const getCommentsByArticleId = (id) => {
  return ncNewsApi
    .get(`/articles/${id}/comments`, { params: { limit: 100 } })
    .then(({ data }) => {
      return data;
    });
};
