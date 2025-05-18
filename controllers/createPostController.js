import Post from "../models/post.js";

export default async function createPost(req, res) {
  const formData = {
    title: req.body.title,
    slug: req.body.slug,
    tagsString: req.body.tags,
    content: req.body.content,
  };

  try {
    const tags = formData.tagsString.split(",");
    tags.forEach((tag) => {
      tag.trim().toLowerCase();
    });

    await Post.create({
      slug: formData.slug,
      title: formData.title,
      tags: tags,
      content: formData.content,
      published: false,
    });
    console.log("Post created!");

    res.status(201);
    res.render("admin/create", {
      layout: req.ejsLayout,
      title: "Blog Website Admin - Create Post",
      message: "Post created!",
      formData: {},
    });
  } catch (err) {
    console.error(err);
    res.status(500);
    res.render("admin/create", {
      layout: req.ejsLayout,
      title: "Blog Website Admin - Create Post",
      message: `Failed to create post\nError: ${err.message}`,
      formData,
    });
  }
}
