import type { Asset, AssetStatus } from "../types/Assets";
import { apiClient } from "./ApiClient";

type BackendAsset = {
  _id: string;
  ownerId: string;
  originalName: string;
  mimeType: string;
  size: number;
  status: AssetStatus;
  storage: {
    bucket: string;
    key: string;
  };
  createdAt: string;
  updatedAt: string;
};

type UploadAssetResponse = {
  asset: BackendAsset;
};

const getAssetType = (
  mimeType: string,
): Asset["type"] => {
  if (mimeType.startsWith("image/")) {
    return "image";
  }

  if (mimeType.startsWith("video/")) {
    return "video";
  }

  if (mimeType.startsWith("audio/")) {
    return "audio";
  }

  return "document";
};

const mapAsset = (
  asset: BackendAsset,
): Asset => {
  return {
    id: asset._id,
    ownerId: asset.ownerId,
    name: asset.originalName,
    type: getAssetType(asset.mimeType),
    size: asset.size,
    status: asset.status,
    storage: asset.storage,
    createdAt: asset.createdAt,
    updatedAt: asset.updatedAt,
  };
};

export const AssetsService = {
  async fetchAllAssets(): Promise<Asset[]> {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await apiClient(
      `/api/asset`,
      {
        method: "GET"
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch assets",
      );
    }

    return data.assets.map(mapAsset);
  },

  async uploadAsset(file: File): Promise<Asset> {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Authentication required");
    }

    const formData = new FormData();

    formData.append("file", file);

    const response = await apiClient(
      `/api/asset`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data: UploadAssetResponse = await response.json();

    if (!response.ok) {
      throw new Error(
        (data as { message?: string }).message ||
        "Failed to upload asset",
      );
    }

    return mapAsset(data.asset);
  },
};