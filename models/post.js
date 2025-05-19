import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postSchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    lowercase: true,
  },
  content: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    required: true,
    default: () => Date.now(),
  },
});
postSchema.methods.getTagsString = function () {
  return this.tags.join(", ");
};

const Post = model("Post", postSchema);
export default Post;
