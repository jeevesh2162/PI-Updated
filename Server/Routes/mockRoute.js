import express from 'express';
import { createMockInterview, getMockByID, getUserMockInterviews } from '../Controllers/mockInterview.js';
import { authMiddleware } from '../Middleware/auth.js';

const mockRoute = express.Router();

// Routes with authentication middleware
mockRoute.post('/mockInterview', authMiddleware, createMockInterview);
mockRoute.get('/mockInterview/:mockId',getMockByID);
mockRoute.get("/mockInterviews", authMiddleware, getUserMockInterviews);


export default mockRoute;
