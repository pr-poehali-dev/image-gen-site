import type { RequestHandler } from "express";

interface GenerateImageRequest {
  prompt: string;
}

interface GenerateImageResponse {
  imagePath: string;
  success: boolean;
  message?: string;
}

export const generateImage: RequestHandler = async (req, res) => {
  try {
    const { prompt } = req.body as GenerateImageRequest;

    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    // Используем встроенный генератор изображений
    const generateImageTool = await import("@/tools/generateImage");

    const result = await generateImageTool.generateImage({ prompt });

    if (result && result.imagePath) {
      const response: GenerateImageResponse = {
        imagePath: result.imagePath,
        success: true,
        message: "Image generated successfully",
      };

      return res.json(response);
    } else {
      return res.status(500).json({
        success: false,
        message: "Failed to generate image",
      });
    }
  } catch (error) {
    console.error("Error in generateImage API:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default generateImage;
