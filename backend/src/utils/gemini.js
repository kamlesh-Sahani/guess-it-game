/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import  {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  console.log(process.env.NEXT_PUBLIC_GEMINI_API_KEY,"sf")
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  async function generateWordAndHints(topic) {

    const prompt = `Generate a random word for a guessing game along with 3 hints. The word should be related to one of the following topics:${topic}. The hints should be progressively easier, starting with a challenging hint and ending with a very obvious one. Return the response in JSON format with the following structure:

{
  "word": "the word to guess",
  "hints": [
    "a challenging hint",
    "a medium difficulty hint",
    "a very obvious hint"
  ]
}

Example:
{
  "word": "blockchain",
  "hints": [
    "A decentralized digital ledger technology",
    "Used in cryptocurrencies like Bitcoin",
    "It's a chain of blocks"
  ]
}`
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  }
  
  export default generateWordAndHints;