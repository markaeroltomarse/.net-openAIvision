import { IsArray, IsBase64, IsNotEmpty, IsString } from "class-validator";

export class ICreateAnalyzeImage {
  @IsArray()
  @IsNotEmpty()
  base64Images: string[];
}
