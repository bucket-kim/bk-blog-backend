const PATH = "./data.json";
const fs = require("fs");

class Post {
  get() {
    return this.readData();
  }

  getIndividualBlog(id) {
    const posts = this.readData();
    const foundPost = posts.find((post) => post.id == id);
    return foundPost;
  }

  add(newPost) {
    const currPost = this.readData();
    currPost.unshift(newPost);
    this.storeData(currPost);
  }

  readData() {
    let rawData = fs.readFileSync(PATH);
    let post = JSON.parse(rawData);
    return post;
  }

  storeData(data) {
    try {
      fs.writeFileSync(PATH, JSON.stringify(data));
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Post;
