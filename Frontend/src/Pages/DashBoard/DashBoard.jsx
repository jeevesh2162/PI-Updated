import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddNewInterview from '@/components/AddNewInterview/AddNewInterview';
import InterviewList from '@/components/InterviewList/InterviewList';

const Dashboard = () => {

  return (
    <div>
      <main className="mx-5 md:mx-20 lg:mx-36 p-10">
        <h2 className="font-bold text-3xl text-primary">Dashboard</h2>
        <h2 className="text-gray-500">Create and Start your AI Mockup Interview</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
          <AddNewInterview />
        </div>

          <InterviewList/>
      </main>      
    </div>
  );
};

export default Dashboard;
