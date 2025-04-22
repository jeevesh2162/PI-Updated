import { storeContext } from '@/Context/Store';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import InterviewCard from '../InterviewCard/InterviewCard';

const InterviewList = () => {
  const [interviewList,setInterviewList]=useState();

  const token = localStorage.getItem('token');

  const GetInterviewList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/mockInterviews`,
        { headers: { token } }
      );
      console.log(response.data);
      setInterviewList(response.data);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };
  

  useEffect(() => {
    GetInterviewList();
  }, []);
  return (
    <div>
      <h2 className='font-medium text-xl'>Previous Mock Interview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList?.length > 0
          ? interviewList.map((interview, index) => (
              <InterviewCard interview={interview} key={index} />
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="h-[100px] w-full bg-gray-200 animate-pulse rounded-lg"
              ></div>
            ))}
      </div>
    </div>
  )
}

export default InterviewList