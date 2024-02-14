import { ICreateAnalyzeImage } from "@/dto/vision.dto";
import { HttpBadRequestError } from "@/lib/errors";

import OpenAI from "openai";

// Create an instance of the OpenAI class with the API key from the environment variable
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

// Define the VisionService class
export default class VisionService {
  // Define the GPT-4 Vision model
  private readonly MODEL = "gpt-4-vision-preview";

  // Method to analyze an image using the OpenAI GPT-4 Vision model
  public async analyzeImage(payload: ICreateAnalyzeImage) {
    // Convert base64 images to OpenAI-compatible format
    const content: any[] = payload.base64Images.map((image) => ({
      type: "image_url",
      image_url: {
        url: image,
      },
    }));

    // Make a request to OpenAI's chat completions API
    const response = await openai.chat.completions
      .create({
        model: this.MODEL,
        max_tokens: 400,
        messages: [
          {
            role: "system",
            content:
              content.length > 0
                ? "What is in these images? And can you put || as a separate answer per image?"
                : "What is in this image?",
          },
          {
            role: "user",
            content,
          },
        ],
      })
      .catch((error) => {
        // Handle errors and throw a custom HTTP error
        throw new HttpBadRequestError("[ERROR] OpenAI Vision", error.error);
      });

    // Return the first choice from the OpenAI response
    return response.choices[0];
  }
}
