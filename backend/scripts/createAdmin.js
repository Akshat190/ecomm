import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const makeAdmin = async (email) => {
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { isAdmin: true },
      { new: true }
    );
    console.log(`User ${email} is now an admin`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

makeAdmin('your-email@example.com'); 