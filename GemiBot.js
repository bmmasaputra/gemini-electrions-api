import dotenv from "dotenv"
import {GoogleGenerativeAI} from "@google/generative-ai"

dotenv.config()

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function run(prompt) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  // const prompt = "Write a story about a magic backpack."

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return text
}


// const text = await run("rekomendasi laptop gaming spek dewa");
// console.log(text)