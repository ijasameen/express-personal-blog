import Post from "../models/post.js";

export async function getAllView(req, res) {
  try {
    const posts = await Post.find({}, { title: 1 }).exec();
    res.status(200);
    res.render("admin/index", {
      layout: req.ejsLayout,
      title: "Blog Website Admin",
      message: null,
      posts: posts,
    });
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send("<h1>500 Internal Error</h1>");
  }
}

export async function getCreateView(req, res) {
  res.status(200);
  res.render("admin/create", {
    layout: req.ejsLayout,
    title: "Blog Website Admin - Create Post",
    message: null,
    post: {},
  });
}

export async function getEditView(req, res) {
  const id = req.params.id;
  console.log(req.url, id);

  try {
    const post = await Post.findById(id).exec();

    res.status(200);
    res.render("admin/edit", {
      layout: req.ejsLayout,
      title: "Blog Website Admin - Edit Post",
      message: null,
      post,
    });
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send("<h1>500 Internal Error</h1>");
  }
}

export async function createPost(req, res) {
  try {
    const tags = req.body.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase());

    await Post.create({
      slug: req.body.slug,
      title: req.body.title,
      tags: tags,
      content: req.body.content,
      published: false,
    });
    console.log("Post created!");

    res.status(201);
    res.send("Post created!");
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(`Failed to create post\nError: ${err.message}`);
  }
}

export async function editPost(req, res) {
  try {
    const id = req.params.id;

    const tags = req.body.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase());

    const post = await Post.findById(id).exec();
    post.title = req.body.title;
    post.slug = req.body.slug;
    post.tags = tags;
    post.content = req.body.content;
    post.updatedAt = Date.now();
    await post.save();
    console.log("Post updated!");

    res.status(201);
    res.send("Post updated!");
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(`Failed to update post\nError: ${err.message}`);
  }
}

export async function deletePost(req, res) {
  try {
    const id = req.params.id;

    await Post.deleteOne({ _id: id }).exec();
    console.log("Post updated!");

    res.status(200);
    res.send("Post deleted!");
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send(`Failed to delete the post\nError: ${err.message}`);
  }
}
