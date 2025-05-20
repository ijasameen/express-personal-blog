import Post from "../models/post.js";

export async function getBlogsView(req, res) {
  try {
    const posts = await Post.find({}, { title: 1, slug: 1 }).exec();
    res.status(200);
    res.render("blogs", {
      title: "Blog Website - Blogs",
      page: "Blogs",
      posts,
    });
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send("<h1>500 Internal Error</h1>");
  }
}

export async function getBlogPostView(req, res) {
  const slug = req.params.slug;
  try {
    const post = await Post.findOne({ slug }).exec();

    if (!post) {
      res.redirect("/404");
    }

    res.status(200);
    res.render("blog-post", {
      title: `Blog Website - ${post.title}`,
      post,
    });
  } catch (err) {
    console.error(err);
    res.status(500);
    res.send("<h1>500 Internal Error</h1>");
  }
}
