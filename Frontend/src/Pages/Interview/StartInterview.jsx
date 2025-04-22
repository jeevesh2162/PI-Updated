import QuestionsSection from '@/components/QuestionSection/QuestionsSection';
import RecordAnswerSection from '@/components/RecordAnswer/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const StartInterview = () => {
  const {mockId}=useParams();

  const [interviewData,setInterviewData]=useState()
  const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);
  const [mockInterviewQuestion,setMockInterviewQuestion]=useState([])

  useEffect(() => {
    GetInterviewDetails()
}, []);

  const GetInterviewDetails = async () => {
    
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/mockInterview/${mockId}`
      );        
        const jsonMockResp=JSON.parse(response.data.jsonMockResp)
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(response.data)
    } catch (error) {
        console.error('Error fetching interview details:', error);
    }
};
   
  return (
    <div className="mx-5 md:mx-20 lg:mx-35">
    <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-h-[500px]'>
        {/* Questions  */}
        <QuestionsSection
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video/ Audio Recording  */}
        <RecordAnswerSection
         mockInterviewQuestion={mockInterviewQuestion}
         activeQuestionIndex={activeQuestionIndex}
         interviewData={interviewData}
        />
    </div>
    <div className='flex justify-end gap-3 mb-3'>
      {activeQuestionIndex>0&&  
      <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
      {activeQuestionIndex!=mockInterviewQuestion?.length-1&& 
       <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
      {activeQuestionIndex==mockInterviewQuestion?.length-1&&  
      <Link to={`/dashboard/interview/${mockId}/feedback`}>
      <Button >End Interview</Button>
      </Link>
      }
    </div>
</div>  
)
}

export default StartInterview