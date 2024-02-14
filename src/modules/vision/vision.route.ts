import { ICreateAnalyzeImage } from "./../../dto/vision.dto";
import { Router } from "express";
import RequestValidator from "@/middlewares/request-validator";

import VisionController from "./vision.controller";

const visionRouter: Router = Router();
const controller = new VisionController();

/**
 * Ask Vision
 * @typedef {object} ICreateAnalyzeImage
 * @property {string} base64Image.required - email of user
 */
/**
 * Vision
 * @typedef {object} Vision
 * @property {string} id - Prompt Id
 * @property {string} message - Result of the prompt

 */
/**
 * POST /vision
 * @summary Submit image
 * @tags Vision
 * @param {ICreatePromptVision} request.body.required
 * @return {IVision} 201 - Submit image to analyze by Vision
 * @return {object} 400 - Bad request response
 */
visionRouter.post(
  "/",
  RequestValidator.validate(ICreateAnalyzeImage),
  controller.analyzeImage
);

export default visionRouter;
