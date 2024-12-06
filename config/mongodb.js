import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Connected to Mongo ✅✅✅");
  });
  await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`);
};

export default connectDB;
