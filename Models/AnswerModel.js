import mongoose from 'mongoose';

const userAnswerSchema = new mongoose.Schema({
  mockIdRef: { type: String, required: true },
  question: { type: String, required: true },
  correctAns: { type: String },
  userAns: { type: String, required: true },
  feedback: { type: String },
  rating: { type: String },
  createdBy: { type: String, required: true }, // Added createdBy field
  createdAt: { type: String, required: true },
  activeQuestionIndex: { type: String, required: true },
});

const UserAnswer = mongoose.model('UserAnswer', userAnswerSchema);

export default UserAnswer;
