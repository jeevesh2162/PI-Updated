import React from 'react'
import { useNavigate } from 'react-router-dom';

const InterviewCard = ({ interview }) => {
    const navigate = useNavigate();

    const onStart = () => {
      navigate(`/dashboard/interview/${interview?.mockId}`);
    };
  
    const onFeedbackPress = () => {
      navigate(`/dashboard/interview/${interview.mockId}/feedback`);
    };
  
    return (
      <div className="border shadow-sm rounded-lg p-3">
        <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
        <h2 className="text-sm text-gray-600">{interview?.jobExperience} Years of Experience</h2>
        <h2 className="text-xs text-gray-400">Created At: {interview.createdAt}</h2>
        <div className="flex justify-between mt-2 gap-5">
          <button
            className="w-full px-4 py-2 text-sm border rounded-lg bg-gray-100 hover:bg-gray-200"
            onClick={onFeedbackPress}
          >
            Feedback
          </button>
          <button
            className="w-full px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            onClick={onStart}
          >
            Start
          </button>
        </div>
      </div>
    );
  }

export default InterviewCard