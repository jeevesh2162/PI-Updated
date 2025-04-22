import UserAnswer from '../Models/AnswerModel.js';

// Insert a new user answer
export const insertUserAnswer = async (req, res) => {
  try {
    const { 
      mockIdRef, 
      question, 
      correctAns, 
      userAns, 
      feedback, 
      rating, 
      createdAt, 
      activeQuestionIndex 
    } = req.body;

    const createdBy = req.userId; // Assuming authMiddleware attaches the user ID to req

    if (!createdBy) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const newUserAnswer = new UserAnswer({
      mockIdRef,
      question,
      correctAns,
      userAns,
      feedback,
      rating,
      createdBy,
      createdAt,
      activeQuestionIndex,
    });

    const savedAnswer = await newUserAnswer.save();
    res.status(201).json({ message: 'User answer recorded successfully', savedAnswer });
  } catch (error) {
    console.error('Error inserting user answer:', error);
    res.status(500).json({ error: 'Failed to insert user answer.' });
  }
};

// Get all user answers
export const getAllUserAnswers = async (req, res) => {
  try {
    const userAnswers = await UserAnswer.find();
    res.status(200).json(userAnswers);
  } catch (error) {
    console.error('Error fetching user answers:', error);
    res.status(500).json({ error: 'Failed to fetch user answers.' });
  }
};

// Get user answers by mock ID
export const getUserAnswersByMockId = async (req, res) => {
  try {
    const { mockIdRef } = req.params;

    const userAnswers = await UserAnswer.find({ mockIdRef }).sort({ activeQuestionIndex: 1 });

    if (userAnswers.length === 0) {
      return res.status(404).json({ message: 'No feedback found for this mock ID.' });
    }

    res.status(200).json(userAnswers);
  } catch (error) {
    console.error('Error fetching user answers by mock ID:', error);
    res.status(500).json({ error: 'Failed to fetch user answers by mock ID.' });
  }
};
