import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  transactions: [{
    type: Schema.Types.ObjectId,
    ref: 'Transaction'
  }]
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
