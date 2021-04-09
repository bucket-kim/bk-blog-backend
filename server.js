const express = require("express");
const app = express();
const Post = require("./api/model/post");
const postData = new Post();
const port = 8000;
const cors = require("cors");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
  },
});
const upload = multer({ storage: storage });

const getExt = (type) => {
  switch (type) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpeg";
  }
};

app.use(express.json());

app.use(cors());

app.use("/uploads", express.static("uploads"));

app.get("/post", (req, res) => {
  res.status(200).send(postData.get());
});

app.post("/newPost", upload.single("post_image"), (req, res) => {
  const newPost = {
    "id": `${Date.now()}`,
    "title": req.body.title,
    "content": req.body.content,
    "post_image": req.file.path,
    "added_date": `${Date.now()}`,
  };
  postData.add(newPost);
  res.status(201).send(newPost);
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

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
