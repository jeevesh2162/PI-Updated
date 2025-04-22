
import { storeContext } from '@/Context/Store';
import { AtomIcon, Edit, Share2 } from 'lucide-react';  
import React, { useContext } from 'react';  
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Home = () => { 
  const {setShowLogin}=useContext(storeContext)
  const token = localStorage.getItem('token');

  const navigate=useNavigate()
  
  return(  
  <div>  
    
       <div className="flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 mx-5 md:mx-20 lg:mx-36 sm:mt-20">
      {/* Left Side */}
      <div>
        <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight">
        Ace Your        <br className="max-md:hidden" />{" "}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
          Interviews{" "}
          </span>{" "}
         <br className="max-md:hidden" />Land Your Dream Job
        </h1>

          <p className="my-6 text-sm text-gray-500">
          Practice real-time interviews with cutting-edge AI!{" "}
          <br className="max-sm:hidden" />
          Get instant feedback, refine your skills, and land your dream job with ease.{" "}
        </p>

        <div>
          <label
            className="inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:scale-105 transition-all duration-700"
          >
            {/* <img width={20} src={assets.upload_btn_icon} /> */}
            <button onClick={token? ()=>navigate('/dashboard'):()=>setShowLogin(true)}className="text-white text-sm font-semibold"> 
              Get Started
            </button>
          </label>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full max-w-md">
        <img src='image.png' />
      </div>
    </div>

    
    <section className="py-8 bg-white px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
  <h2 id="how-it-works" className="font-bold text-4xl">How It Works?</h2> {/* Increased font size */}
  <h2 className="text-lg text-gray-500">Give mock interview in just 3 simple easy steps</h2> {/* Increased font size */}
  <div className="mt-8 flex items-start flex-wrap gap-4 xl:mt-24 justify-center">
    <div className="flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500">
      <img className="max-w-9" src="contact-form.png" alt="Upload" />
      <div>
        <p className="text-2xl font-medium text-black bg-gradient-to-r from-gray-900 to bg-gray-400 bg-clip-text "> {/* Increased font size */}
          Write prompt for your form
        </p>
        <p className="text-base text-neutral-500 mt-1"> {/* Increased font size */}
          Paste a job description and receive realistic interview <br/> questions like Behavioral and Technical Questions.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500">
      <img className="max-w-9" src="job-interview.png" alt="Interview" />
      <div>
        <p className="text-2xl font-medium bg-gradient-to-r from-gray-900 to bg-gray-400 bg-clip-text text-black"> {/* Increased font size */}
          Start Mock Interview
        </p>
        <p className="text-base text-neutral-500 mt-1"> {/* Increased font size */}
          Begin your mock interview session with real-time <br/> questions tailored to the job role.
        </p>
      </div>
    </div>

    <div className="flex items-start gap-4 bg-white border drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500">
      <img className="max-w-9" src="feedback.png" alt="Feedback" />
      <div>
        <p className="text-2xl font-medium bg-gradient-to-r from-gray-900 to bg-gray-400 bg-clip-text text-black"> {/* Increased font size */}
          Get AI Feedback
        </p>
        <p className="text-base text-neutral-500 mt-1"> {/* Increased font size */}
          Receive instant AI-driven feedback on your  answers to <br/> improve your performance.
        </p>
      </div>
    </div>
  </div>
</section>

<div className='flex items-center justify-between gap-4 px-4 mx-5 md:mx-20 lg:mx-36 py-3 '>
      <Link to='/'>
        <img src="logo-no-background.png" alt="Mockify Logo" width={150} />
      </Link>
      <p className='flex-1 border-1 border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>
        Copyright @Mockify.com | All rights reserved.
      </p>
      <div className='flex gap-4'>
        <img width={20} src='facebook.png' alt="Facebook" />
        <img width={20} src='twitter.png' alt="Twitter" />
        <img width={20} src='google-plus.png' alt="Google Plus" />
      </div>
    </div>

  </div>  
);  
}
export default Home;



{/* <section >  
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">  
        <h1 className="mb-4 font-extrabold tracking-tight leading-none text-[#4845D2] md:text-10xl lg:text-8xl dark:text-white">  
          Land your dream job  
        </h1>  
        <p className="mb-3   font-normal text-gray-500 lg:text-xl dark:text-gray-400">  
          Practice interview questions and get real-time feedback from your private and judgment-free AI Interview Coach  
        </p>  
        <div className="flex flex-col mb-2 lg:mb-2 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">  
          <button className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-slate-800 hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">  
            Get Started  
          </button>  
        </div>  
      </div>  
    </section>  
    <section className="py-8 bg-white  px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">  
      <h2 className="font-bold text-3xl">How it Works?</h2>  
      <h2 className="text-md text-gray-500">Give mock interview in just 3 simple easy steps</h2>  
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">  
        <div
          className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"  
        
        >  
          <AtomIcon className='h-8 w-8' />  
          <h2 className="mt-4 text-xl font-bold text-black">Write prompt for your form</h2>  
          <p className="mt-1 text-sm text-gray-600">  
            Paste a job description and receive realistic interview questions like Behavioral and Technical Questions.  
          </p>  
        </div>  

        <div
          className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"  
         
        >  
          <Edit className='h-8 w-8' />  
          <h2 className="mt-4 text-xl font-bold text-black">Edit Your form</h2>  
          <p className="mt-1 text-sm text-gray-600">  
            Record the answer with audio or text simulating the interview experience. Boost your confidence and ace the job interview.  
          </p>  
        </div>  

        <div 
          className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"  
        >  
          <Share2 className='h-8 w-8' />  
          <h2 className="mt-4 text-xl font-bold text-black">Improve with AI coaching</h2>  
          <p className="mt-1 text-sm text-gray-600">  
            Get instant AI feedback and the correct answer along with the rating based on your answer. Make your next job interview stress-free.  
          </p>  
        </div>  
      </div>  
    </section>   */}
