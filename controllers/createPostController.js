import Post from "../models/post.js";

export default async function createPost(req, res) {
  try {
    const title = req.body.title;
    const slug = req.body.slug;
    const tagsString = req.body.tags;
    const content = req.body.content;

    const tags = tagsString.split(",");
    tags.forEach((tag) => {
      tag.trim().toLowerCase();
    });

    await Post.create({
      slug: slug,
      title: title,
      tags: tags,
      content: content,
      published: false,
    });
    console.log("Post created!");

    res.status(200);
    res.render("admin/create", {
      title: "Blog Website Admin - Create Post",
      layout: req.ejsLayout,
    });
  } catch (err) {
    console.error(err);
    res.status(500);
    res.render("admin/create", {
      title: "Blog Website Admin - Create Post",
      layout: req.ejsLayout,
    });
  }
}
