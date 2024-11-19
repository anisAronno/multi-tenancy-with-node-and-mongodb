const mongoose = require('mongoose');
const Model = require('./Model.js');

// Blog Schema
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    published: {
      type: Boolean,
      default: false,
    },
    published_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Create model
const BlogModel = mongoose.model('Blog', blogSchema);

// Extend the base Model with Blog-specific methods
class Blog extends Model {
  constructor() {
    super(BlogModel);
  }

  // Publish a blog
  async publish(blogId) {
    try {
      const blog = await this.model.findById(blogId);
      if (!blog) {
        throw new Error('Blog not found');
      }

      blog.published = true;
      blog.published_at = new Date();
      await blog.save();

      return blog;
    } catch (error) {
      throw new Error(`Publish operation failed: ${error.message}`);
    }
  }

  // find categories by blog
  async findCategoriesByBlog(blogId) {
    try {
      return await this.model.findById(blogId).populate('categories');
    } catch (error) {
      throw new Error(
        `Find categories by blog operation failed: ${error.message}`
      );
    }
  }

  //blogs with tags
  async findTagsByBlog(blogId) {
    try {
      return await this.model.find({ tags: blogId }).populate('tags');
    } catch (error) {
      throw new Error(`Find blogs by tag operation failed: ${error.message}`);
    }
  }
}

module.exports = new Blog();