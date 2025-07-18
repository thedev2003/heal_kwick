import mongoose from 'mongoose';

const connection = {};

async function connectDB() {
  if (connection.isConnected) {
    console.log('Already connected to the database.');
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('Using previous database connection.');
      return;
    }
    await mongoose.disconnect();
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log('New database connection established.');
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw new Error('Could not connect to the database.');
  }
}

export default connectDB;