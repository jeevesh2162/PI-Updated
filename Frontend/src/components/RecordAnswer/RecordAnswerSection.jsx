import React, { useContext, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from '../ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/GeminiAiModel';
import moment from 'moment';
import axios from 'axios';
import { storeContext } from '@/Context/Store';

const RecordAnswerSection = ({ mockInterviewQuestion, activeQuestionIndex, interviewData }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Update user answer as speech-to-text results are received
  useEffect(() => {
    if (results.length > 0) {
      const newAnswer = results.reduce(
        (acc, result) => acc + result.transcript + ' ',
        ''
      );
      setUserAnswer(newAnswer.trim());
    }
  }, [results]);

  // Log current user answer
  console.log('User Answer:', userAnswer);

  const StartStopRecording =() => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  // Update the user answer when speech-to-text is finished and the answer has sufficient length
  useEffect(() => {
    if(isRecording)console.log("recording")
    if (!isRecording && userAnswer?.length >= 5) {
        
        console.log("recording stopped")
      UpdateUserAnswer();
    }
    console.log("Hl=ello")

  }, [userAnswer,isRecording]);

  // Function to handle updating the user answer and saving it to the backend
  const UpdateUserAnswer = async () => {
    try {
        setLoading(true);

        console.log(userAnswer);

        const feedbackPrompt = 
            `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, ` +
            `User Answer: ${userAnswer}, Depends on question and user answer for the given interview question, ` +
            `please give us rating for answer and feedback as area of improvement if any ` +
            `in just 3 to 5 lines to improve it in JSON format with rating field and feedback field`;

        
        console.log(feedbackPrompt);


        const result = await chatSession.sendMessage(feedbackPrompt);

        // Log the result to see if it's being returned
        console.log('ChatSession Result:', result);

        if (result && result.response) {
            const mockJsonResp = (result.response.text())
                .replace('```json', '')
                .replace('```', '');
            console.log('Cleaned JSON Response:', mockJsonResp);

            const JsonFeedbackResp = JSON.parse(mockJsonResp);
            console.log('Parsed Feedback Response:', JsonFeedbackResp);

            const requestBody = {
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.question,
                correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                feedback: JsonFeedbackResp?.feedback,
                rating: JsonFeedbackResp?.rating,
                createdAt: moment().format('DD-MM-yyyy'),
                activeQuestionIndex:(activeQuestionIndex+1).toString(),
            };
            console.log(requestBody)
            const response = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/api/userAnswer`,
              requestBody,
              { headers: { token } }
            );

            if (response.status === 201) {
                toast('User Answer recorded successfully');
                setUserAnswer('');
                setResults([]); 
            }
        } else {
            console.error('No valid response received from chatSession');
            toast('Failed to get feedback from chat model');
        }
    } catch (error) {
        console.error('Error saving user answer:', error);
        toast('Failed to save user answer');
        setUserAnswer('');
        setResults([]); 
    } finally {
        setLoading(false);
    }
};

  // Reset the user answer when a new question is active
  useEffect(() => {
    results.length = 0;
    setUserAnswer('');
  }, [activeQuestionIndex]);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-18 bg-black justify-center items-center rounded-lg p-5">
        <img src="/webcam.png" width={200} height={200} className="absolute" />
        <Webcam style={{ height: 300, width: 400, zIndex: 10 }} mirrored={true} />
      </div>
      <Button
        variant="outline"
        className="my-8"
        onClick={StartStopRecording}
        disabled={loading}
      >
        {isRecording ? (
          <h2 className="text-red-600 animate-pulse flex gap-2 items-center">
            <StopCircle />
            Stop Recording
          </h2>
        ) : (
          <h2 className="text-primary flex gap-2 items-center">
            <Mic />
            Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
