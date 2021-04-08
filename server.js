const express = require("express");
const app = express();
const Post = require("./api/model/post");
const postData = new Post();
const port = 8000;
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.get("/post", (req, res) => {
  res.status(200).send(postData.get());
});

app.post("/newPost", (req, res) => {
  const newPost = {
    "id": `${Date.now()}`,
    "title": req.body.title,
    "content": req.body.content,
    "post_image": req.body["post_image"],
    "added_date": `${Date.now()}`,
  };
  postData.add(newPost);
  res.status(200).send(newPost);
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
