import mongoose from "mongoose";

export const databaseConnect = async (url) => {
  try {
    mongoose.set("strictQuery", false);
    const connect = await mongoose.connect(url);
    return connect;
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
