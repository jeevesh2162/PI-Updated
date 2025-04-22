import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import axios from 'axios';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Interview = () => {
    const { mockId } = useParams();
    const [WebCamEnabled,setWebCamEnabled]=useState(false)
    const [interviewDetails, setInterviewDetails] = useState(null);


const GetInterviewDetails = async () => {
    
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/api/mockInterview/${mockId}`
          );
        //   console.log(response.data)
        setInterviewDetails(response.data);
    } catch (error) {
        console.error('Error fetching interview details:', error);
    }
};
    useEffect(() => {
        GetInterviewDetails()
    }, []);



  return (
    <div className="mx-5 md:mx-20 lg:mx-36">
        <div className="my-10">
        <h2 className='font-bold text-2xl'>Let's Get Started</h2>
        <div className='grid grid-col-1 md:grid-cols-2 gap-10'>
       
            <div className='flex flex-col my-5 gap-5 '>
                <div className='flex flex-col p-5 rounded-lg border gap-5'>
            <h2 className='text-lg'><strong>Job Role/Job Position : </strong>{interviewDetails?.jobPosition}</h2>
            <h2 className='text-lg'><strong>Job Description/Tech Stack : </strong>{interviewDetails?.jobDesc} </h2>
            <h2 className='text-lg'><strong>Years of Experience : </strong>{interviewDetails?.jobExperience} </h2>
            </div>
            <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
              <h2 className='flex gap-2 items-center text-yellow-700'><Lightbulb/><strong>Information</strong></h2> 
              <h2 className='mt-3 text-black'>Welcome to your AI-powered mock interview! Experience
                  personalized questions, real-time feedback, and a detailed
                  performance report. Prepare, engage, and refine your skills
                  for success. Let’s begin your journey!</h2>
            </div>
            </div>  
            <div>
            {WebCamEnabled?<Webcam onUserMedia={()=>setWebCamEnabled(true)} onUserMediaError={()=>{setWebCamEnabled(false)}} mirrored={true} style={{height:300, width:900}}/>:
            <>
            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border '/>
            <Button variant="ghost" className='w-full' onClick={()=>{
                setWebCamEnabled(true)
            }}>Enable WebCam and Microphone</Button>
            </>
}
            </div>
        </div> 
        <div className='flex justify-end items-end mt-2'>   
            <Link to={`/dashboard/interview/${mockId}/start`} >
            <Button>Start Interview</Button>
            </Link>
        </div>

   </div>
   </div>
)
}

export default Interview