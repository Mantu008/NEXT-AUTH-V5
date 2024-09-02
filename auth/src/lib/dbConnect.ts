import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbconnect(): Promise<void> {
  // Ensure this code only runs on the server side
  if (typeof window !== 'undefined') {
    // We're on the client-side, return early
    return;
  }

  // Check if already connected
  if (connection.isConnected) {
    console.log("Already Connected to Database");
    return;
  }

  // Fetch the MongoDB URI from environment variables
  const mongoUri = process.env.NEXT_PUBLIC_MONGO_URI;

  if (!mongoUri) {
    console.error("MONGO_URI environment variable is not defined");
    throw new Error("MONGO_URI environment variable is not defined");
  }

  try {
    const db = await mongoose.connect(mongoUri);

    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected successfully");
  } catch (error: any) {
    console.error("Database Connection Failed", error);
    throw new Error("Database Connection Failed");
  }
}

export default dbconnect;
