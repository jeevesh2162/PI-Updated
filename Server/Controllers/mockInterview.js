import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import MockInterview from '../Models/InterviewModel.js';

// Create a new mock interview
export const createMockInterview = async (req, res) => {
  try {
    const { jsonMockResp, jobPosition, jobDesc, jobExperience } = req.body;

    // Validate required fields
    if (!jsonMockResp || !jobPosition || !jobDesc || !jobExperience) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create a new mock interview entry
    const newMockInterview = new MockInterview({
      mockId: uuidv4(),
      jsonMockResp,
      jobPosition,
      jobDesc,
      jobExperience,
      createdBy: req.userId, // Retrieve user ID from auth middleware
      createdAt: moment().format('DD-MM-yyyy'),
    });

    const savedMockInterview = await newMockInterview.save();
    res.status(201).json({ mockId: savedMockInterview.mockId });
  } catch (error) {
    console.error('Error creating mock interview:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get mock interview by ID
export const getMockByID = async (req, res) => {
  const { mockId } = req.params;

  try {
    const interview = await MockInterview.findOne({ mockId });

    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    res.status(200).json(interview);
  } catch (error) {
    console.error('Error fetching interview details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getUserMockInterviews = async (req, res) => {
  try {
    const userId = req.userId; // Extract userId from middleware

    // Fetch interviews for the logged-in user
    const interviews = await MockInterview.find({ createdBy: userId }).sort({ createdAt: -1 });

    res.status(200).json(interviews);
  } catch (error) {
    console.error("Error fetching user mock interviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};
