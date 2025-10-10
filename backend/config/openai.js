import {OpenAI} from "openai";


const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_GEMINI_KEY,
    baseURL: process.env.OPEN_AI_BASE_URL
    
});

export default openai;