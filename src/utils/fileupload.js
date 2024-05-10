import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileUploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log("error", error);
    return null;
  }
};

const deleteFileOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;
  try {
    const response = await cloudinary.uploader.destroy(localFilePath);

    if (response.result === "ok") {
      return { success: true, message: "File deleted successfully" };
    } else {
      throw new Error("Failed to delete file from Cloudinary");
    }
  } catch (error) {
    console.error("Error deleting file:", error.message);
    return { success: false, error: error.message };
  }
};

export { fileUploadOnCloudinary, deleteFileOnCloudinary };
