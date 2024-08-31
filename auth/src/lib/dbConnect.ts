import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbconnect(): Promise<void> {
  // Check if already connected
  if (connection.isConnected) {
    console.log("Already Connected to Database");
    return;
  }

  // Fetch the MongoDB URI from environment variables
  const mongoUri = process.env.NEXT_PUBLIC_MONGO_URI;

  // Check if the MongoDB URI is defined
  if (!mongoUri) {
    console.error("MONGO_URI environment variable is not defined");
    throw new Error("MONGO_URI environment variable is not defined");
  }

  try {
    // Attempt to connect to the MongoDB database
    const db = await mongoose.connect(mongoUri);

    // Save the connection state
    connection.isConnected = db.connections[0].readyState;

    console.log("Database connected successfully");
  } catch (error: any) {
    console.error("Database Connection Failed", error);
    throw new Error("Database Connection Failed");
  }
}

export default dbconnect;
