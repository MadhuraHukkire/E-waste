import openai from "../config/openai.js";

export const TextMessageController = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
            role: "system",
            content: "You are an AI assistant specialized in e-waste management. Only answer questions related to e-waste. Give short responses just maximum upto 3 lines. Politely refuse unrelated topics.  Summarize if the answer is long."
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    // Correctly access the first message content
    const reply = {
      content: response.choices[0].message.content, // <- this line is key
      isImage: false
    };

    return res.status(200).json({
      reply,
      success: true,
      error: false
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: true,
      errorMessage: error.message
    });
  }
};
