import mongoose from 'mongoose';

export interface VerificationCodeDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  expiresAt: Date;
  createdAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>({
  userId: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  },
 
  createdAt: { type: Date, required: true, default: Date.now },
  expiresAt: { type: Date, required: true },
});

const VerificationCodeModel = mongoose.model<VerificationCodeDocument>('VerificationCode', verificationCodeSchema, 'verification_codes');
export default VerificationCodeModel;
