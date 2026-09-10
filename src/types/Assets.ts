export type Asset = {
  id: number;
  name: string;
  type: "image" | "video" | "audio" | "document";
  size: number;
  status: "READY" | "PROCESSING" | "FAILED";
  thumbnailUrl?: string;
  createdAt: string;
};