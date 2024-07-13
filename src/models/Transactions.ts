import mongoose, { Schema } from 'mongoose';

export interface TransactionProps extends Document {
   userId: string
   network: string
   planId: string
   phone: string,
   reference: string,
}

const TransactionSchema: Schema = new Schema({
   userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
   },
   network: {
      type: String,
      required: true
   },

   planId: {
      type: String,
      required: true
   },

   phone: {
      type: String,
      required: true
   },

   reference: {
      type: String,
      required: true
   },
}, { timestamps: true})

export default mongoose.model<TransactionProps>('Transaction', TransactionSchema)