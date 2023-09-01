import mongoose from 'mongoose';
import dotenv from 'dotenv';
export async function connectToMongoDatabase(): Promise<void> {
    dotenv.config();
    const uri = process.env.MONGO_URI;
    console.log("Connecting to: " + uri);
    try {
      await mongoose.connect(uri,);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  

  