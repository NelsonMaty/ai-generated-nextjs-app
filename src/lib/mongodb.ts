import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let mongooseInstance = global.mongoose;

if (!mongooseInstance) {
  mongooseInstance = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (mongooseInstance.conn) {
    return mongooseInstance.conn;
  }

  if (!mongooseInstance.promise) {
    const opts = {
      bufferCommands: false,
    };

    mongooseInstance.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    mongooseInstance.conn = await mongooseInstance.promise;
  } catch (e) {
    mongooseInstance.promise = null;
    throw e;
  }

  return mongooseInstance.conn;
}

export default dbConnect;
