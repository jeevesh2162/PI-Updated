import {  
    GoogleGenerativeAI,  
    HarmCategory,  
    HarmBlockThreshold,  
  } from "@google/generative-ai";  
  
  // Ensure you have placed your API Key in .env file and it's accessible.  
  const apiKey = process.env.GEMINI_API_KEY;  
  
  // Create an instance of the GoogleGenerativeAI  
  const genAI = new GoogleGenerativeAI(apiKey);  
  
  // Define the generation model  
  const model = genAI.getGenerativeModel({  
    model: "gemini-2.0-flash-exp",  
  });  
  
  // Configuration for generation  
  const generationConfig = {  
    temperature: 1,  
    topP: 0.95,  
    topK: 40,  
    maxOutputTokens: 8192,  
    responseMimeType: "text/plain",  
  };  
  
  // Start a chat session  
  export const chatSession = model.startChat({  
    generationConfig,  
  });