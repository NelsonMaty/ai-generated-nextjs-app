import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['deposit', 'withdrawal'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: String,
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);