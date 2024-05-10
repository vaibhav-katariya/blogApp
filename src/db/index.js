import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONDODB_URL}/blogApp`
    );
    console.log(`MONGO DB CONNECT || DB_HOST ${connection.connection.host}`);
  } catch (error) {
    console.log("MONGODB CONNECTION FAILD ERROR : ", error);
    process.exit(1);
  }
};

export default connectDB;
