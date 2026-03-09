// import openai from "../config/openai.js";
// import Groq from 'groq-sdk';
// import dotenv from 'dotenv';

// dotenv.config();

// export const TextMessageController = async (req, res) => {
//   const { prompt } = req.body;
//   const groq = new Groq({
//     apiKey: process.env.GROQ_API_KEY
//   });
  
//   try {
//       const chatCompletion = await groq.chat.completions.create({
//       messages: [
//         {
//           role: "system",
//           content: "You are a helpful assistant that explains things simply.",
//         },
//         {
//           role: "user",
//           content: "Explain the importance of low latency LLMs.",
//         },
//       ],
//       model: "llama-3.1-70b-versatile", // Choose an available model from the Groq console
//       temperature: 0.7,
//       max_tokens: 1024,

//     }); 

//     console.log(chatCompletion.choices[0]?.message?.content || "");
//   }catch(error){
//     console.error("Error with Groq API:", error);
//   }

//   const reply = {
//     content: chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.",
//     isImage: false
//   }


//   // try {
//   //   const response = await openai.chat.completions.create({
//   //     model: "gemini-2.0-flash",
//   //     messages: [
//   //       {
//   //           role: "system",
//   //           content: "You are an AI assistant specialized in e-waste management. Only answer questions related to e-waste. Give short responses just maximum upto 3 lines. Politely refuse unrelated topics.  Summarize if the answer is long."
//   //       },
//   //       {
//   //         role: "user",
//   //         content: prompt,
//   //       },
//   //     ],
//   //   });

//   //   // Correctly access the first message content
//   //   const reply = {
//   //     content: response.choices[0].message.content, // <- this line is key
//   //     isImage: false
//   //   };

//     return res.status(200).json({
//       reply,
//       success: true,
//       error: false
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Something went wrong",
//       success: false,
//       error: true,
//       errorMessage: error.message
//     });
//   }

import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

// Move the client instantiation outside the handler to reuse it
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const TextMessageController = async (req, res) => {
  const { prompt } = req.body;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an AI assistant specialized in e-waste management. Only answer questions related to e-waste. Give short responses just maximum upto 3 lines. Politely refuse unrelated topics.",
        },
        {
          role: "user",
          content: prompt, // Use the dynamic prompt from the request body
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
    });

    const content = chatCompletion.choices[0]?.message?.content || "No response generated from groq api.";

    return res.status(200).json({
      reply: {
        content: content,
        isImage: false
      },
      success: true,
      error: false
    });

  } catch (error) {
    console.error("Error with Groq API:", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: true,
      errorMessage: error.message
    });
  }
};
