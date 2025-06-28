import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully....");
  } catch (error) {
    console.log(`there is an error while conncting db ${error}`);
  }
};

export default connectDB;
