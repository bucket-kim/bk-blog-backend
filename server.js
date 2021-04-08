const express = require("express");
const app = express();
const Post = require("./api/model/post");
const postData = new Post();
const port = 8000;

app.get("/post", (req, res) => {
  res.status(200).send(postData.get());
});

app.get("/post/:post_id", (req, res) => {
  const postId = req.params.post_id;
  const foundPost = postData.getIndividualBlog(postId);
  if (foundPost) {
    res.status(200).send(foundPost);
  } else {
    res.status(404).send("Not Found");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
