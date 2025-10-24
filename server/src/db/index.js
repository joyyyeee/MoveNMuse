import mongoose from "mongoose";

export default async function connectDB() {
  const uri = (process.env.MONGO_URI || '').trim().replace(/\r|\n/g, '');

  if (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://')) {
    throw new Error(`Bad MONGO_URI: ${uri}`);
  }

  const opts = {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
    socketTimeoutMS: 20000,
    maxPoolSize: 10,
    retryWrites: true,
  };

      const conn = await mongoose.connect(uri, opts);
    console.log(`✅ MongoDB connected. Host: ${conn.connection.host}`);
    return conn;
  }