import { type NextFunction, type Request } from "express";
import { HttpStatusCode } from "axios";
import { type CustomResponse } from "@/types/common.type";
import Api from "@/lib/api";
import { TVision } from "@/types/models/vision.model";
import VisionService from "./vision.service";

export default class VisionController extends Api {
  private readonly visionService = new VisionService();

  public analyzeImage = async (
    req: Request,
    res: CustomResponse<TVision>,
    next: NextFunction
  ) => {
    try {
      const result = await this.visionService.analyzeImage(req.body);
      this.send(res, result, HttpStatusCode.Created, "analyzeImage");
    } catch (e) {
      next(e);
    }
  };
}
