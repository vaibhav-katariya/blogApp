import { Blog } from "../model/blog.model.js";
import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { fileUploadOnCloudinary } from "../utils/fileupload.js";

const uploadBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  // Check if title and description are provided
  if (!title || !description || !category) {
    return res
      .status(400)
      .json({ error: "Title and description and category are required" });
  }

  const imagePath = req.files?.image[0]?.path;

  // Check if image is provided
  if (!imagePath) {
    return res.status(400).json({ error: "Image file is required" });
  }

  try {
    // Upload image to Cloudinary
    const uploadedImage = await fileUploadOnCloudinary(imagePath);
    if (!uploadedImage || !uploadedImage.url) {
      throw new Error("Error uploading image to Cloudinary");
    }
    // Create new blog post
    const newBlog = await Blog.create({
      title,
      description,
      category,
      image: uploadedImage.url,
      owner: req.user?._id,
    });

    // Check if blog post is created
    if (!newBlog) {
      throw new Error("Error creating new blog post");
    }

    // Retrieve the created blog post
    const createdBlog = await Blog.findById(newBlog._id);

    // Check if blog post is retrieved
    if (!createdBlog) {
      throw new Error("Error retrieving created blog post");
    }

    // Send success response
    return res.status(201).json({
      message: "Blog uploaded successfully",
      createdBlog,
    });
  } catch (error) {
    console.error("Error uploading the blog:", error);
    return res.status(500).json({ error: "Error uploading the blog" });
  }
});

const getAllBlog = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).populate("owner");
  if (blogs) {
    res.status(200).json(blogs);
  } else {
    res.status(400);
    throw new Error("No blogs found");
  }
});

const getOwnerBlog = asyncHandler(async (req, res) => {
  try {
    const { username } = req.params;
    // console.log(username);

    const user = await User.findOne({ username });

    const blog = await Blog.find({ owner: user._id }).populate({
      path: "owner",
      select: "-password -refreshToken",
    });
    if (blog) {
      res.status(200).json(blog);
    }
  } catch (error) {
    throw new Error("Owner post cannot fatched");
  }
});

export { uploadBlog, getAllBlog, getOwnerBlog };
