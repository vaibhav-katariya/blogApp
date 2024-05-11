import { Blog } from "../model/blog.model.js";
import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteFileOnCloudinary,
  fileUploadOnCloudinary,
} from "../utils/fileupload.js";

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
    if (!uploadedImage || !uploadedImage.public_id) {
      throw new Error("Error uploading image to Cloudinary");
    }
    // Create new blog post
    const newBlog = await Blog.create({
      title,
      description,
      category,
      image: uploadedImage.public_id,
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
  const blogs = await Blog.find({}).populate({
    path: "owner",
    select: "-password -refreshToken",
  });
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

const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;

  // Validation
  if (!title || !description || !category) {
    throw new Error("All fields are required");
  }

  const author = req.user?._id;

  // Find the blog post by ID
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new Error("Blog not found");
  }

  if (blog.owner.toString() !== author.toString()) {
    throw new Error("Only the author can update this blog");
  }

  // Check if image path exists
  const imagePath = req.files?.image[0]?.path;
  if (!imagePath) {
    throw new Error("Image not found");
  }

  // Upload image to Cloudinary
  try {
    await deleteFileOnCloudinary(blog.image);
    const updatedImage = await fileUploadOnCloudinary(imagePath);

    if (!updatedImage || !updatedImage.public_id) {
      throw new Error("Error while updating image");
    }
    // Update the blog post with the new image URL
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        description,
        image: updatedImage.public_id,
        category,
        owner: author,
      },
      { new: true }
    );
    if (!updatedBlog) {
      throw new Error("Error while updating the blog");
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Error while updating blog:", error);
    throw new Error("Error while updating blog");
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new Error("Blog not found");
  }
  // Check if the user is the owner of the blog
  if (blog.owner.toString() !== req.user._id.toString()) {
    throw new Error("Only the owner can delete this blog");
  }
  try {
    // Delete the blog from the database
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    throw new Error("blog cannot deleted");
  }
});

export { uploadBlog, getAllBlog, getOwnerBlog, updateBlog, deleteBlog };
