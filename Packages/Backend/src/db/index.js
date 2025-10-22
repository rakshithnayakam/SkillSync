import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connected ✅");
  } catch (error) {
    console.error("MongoDb connection error❌", error);
    process.exit(1);
  }
};

export default connectDB;
