export type TAnalyzeImageResponse = {
  finish_reason: string;
  index: number;
  message: {
    content: string;
    role: string;
  };
};
