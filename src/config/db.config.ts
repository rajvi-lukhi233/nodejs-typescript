import mongoose from "mongoose";

export const dbConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(String(process.env.DB_URL));
    console.log("Database connected successfully.");
  } catch (error) {
    console.log("Failed to connect DB.");
  }
};
