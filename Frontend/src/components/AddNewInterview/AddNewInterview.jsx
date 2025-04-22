import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from '../ui/textarea';
import { chatSession } from '@/GeminiAiModel';
import { LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { storeContext } from '@/Context/Store';

const AddNewInterview = () => {
    const [dialog, setDialog] = useState(false);
    const [jobPos, setJobPos] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExp, setJobExp] = useState('');
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const [mockId,setMockId]=useState('')
    const baseURL=process.env.URL;
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const handleSubmit = async () => {
        try {
            console.log(jsonResponse)
          const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/mockInterview`,
            {
              jsonMockResp: jsonResponse,
              jobPosition: jobPos,
              jobDesc: jobDesc,
              jobExperience: jobExp,
            },
            { headers: {token}},
          );
      
          if (response.data.mockId) {
            setDialog(false);
            setLoading(false)
            navigate(`/dashboard/interview/${response.data.mockId}`);
            
          }
        } catch (error) {
          console.error("Error creating mock interview:", error);
          setLoading(false)
        }
      };
      
    

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const inputPrompt = `Job position: ${jobPos}, Job Description: ${jobDesc}, Years of Experience: ${jobExp}, Depends on Job Position, Job Description & Years of Experience give us ${process.env.INTERVIEW_QUESTION_COUNT} Interview questions along with Answers in JSON format. Provide "question" and "answer" fields in JSON.`;

            const result = await chatSession.sendMessage(inputPrompt);
            const mockJsonResp = result.response.text()
                .replace('```json', '')
                .replace('```', '');

            if(mockJsonResp){
            setJsonResponse(mockJsonResp);
            } // Trigger backend submission after AI response
        } catch (error) {
            console.error('Error generating AI response:', error);
        } 
    };

    useEffect(()=>{
        handleSubmit()
    },[jsonResponse])
  

    return (
        <div>
            <div
                className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
                onClick={() => setDialog(true)}
            >
                <h2 className="font-bold text-lg text-center">+ Add New</h2>
            </div>

            <Dialog open={dialog} onOpenChange={setDialog}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about the job interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmitHandler}>
                                <div>
                                    <h2>Add details about the job position/role, job description, and years of experience</h2>
                                    <div className="mt-7 my-3">
                                        <label>Job Role/Job Position</label>
                                        <Input
                                            placeholder="Ex. Full-stack developer"
                                            value={jobPos}
                                            onChange={(e) => setJobPos(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="my-3">
                                        <label>Job Description/Tech Stack</label>
                                        <Textarea
                                            placeholder="Ex. React, Angular, Node.js"
                                            value={jobDesc}
                                            onChange={(e) => setJobDesc(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mt-7 my-3">
                                        <label>Years of Experience</label>
                                        <Input
                                            placeholder="Ex. 5"
                                            type="number"
                                            value={jobExp}
                                            onChange={(e) => setJobExp(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-5 justify-end">
                                    <Button type="button" onClick={() => setDialog(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <LoaderCircle className="animate-spin" /> Generating from AI
                                            </>
                                        ) : (
                                            'Start Interview'
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddNewInterview;
