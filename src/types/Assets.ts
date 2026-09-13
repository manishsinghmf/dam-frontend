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

  size: number;

  status: AssetStatus;

  storage: {
    bucket: string;
    key: string;
  };

  thumbnailUrl?: string;

  createdAt: string;

  updatedAt: string;
};