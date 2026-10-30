export type AssetStatus =
  | "uploading"
  | "stored"
  | "processing"
  | "ready"
  | "failed";

export type Asset = {
  id: string;

  ownerId: string;

  name: string;

  type: string;

  mimeType: string;

  size: number;

  status: AssetStatus;

  storage: {
    bucket: string;
    key: string;
  };

  thumbnailUrl: string | null;
  video720pUrl: string | null;
  video1080pUrl: string | null;
  originalUrl: string | null;

  createdAt: string;

  updatedAt: string;
};