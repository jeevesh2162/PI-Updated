import express from 'express';
import { getAllUserAnswers, getUserAnswersByMockId, insertUserAnswer } from '../Controllers/userAnswer.js';
import { authMiddleware } from '../Middleware/auth.js';

const ansRoute = express.Router();

// Insert a new user answer
ansRoute.post('/userAnswer', authMiddleware, insertUserAnswer);

// Get all user answers
ansRoute.get('/userAnswer', getAllUserAnswers);

// Get user answers by mock ID
ansRoute.get('/userAnswer/mockId/:mockIdRef', getUserAnswersByMockId);

export default ansRoute;
