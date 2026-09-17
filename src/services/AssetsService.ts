import type {
  Asset,
  AssetStatus,
} from "../types/Assets";

import { apiClient } from "./ApiClient";

interface BackendAsset {
  id: string;

  ownerId: string;

  name: string;

  mimeType: string;

  size: number;

  status: AssetStatus;

  storage: {
    bucket: string;
    key: string;
  };

  derivatives?: {
    thumbnail?: {
      mimeType: string;
      width?: number;
      height?: number;
      size?: number;
    } | null;

    video720p?: {
      mimeType: string;
      width?: number;
      height?: number;
      size?: number;
    } | null;

    video1080p?: {
      mimeType: string;
      width?: number;
      height?: number;
      size?: number;
    } | null;
  };

  thumbnailUrl: string | null;

  video720pUrl: string | null;

  video1080pUrl: string | null;

  originalUrl: string | null;

  createdAt: string;

  updatedAt: string;
}

export interface AssetPagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;

  hasNextPage: boolean;

  hasPreviousPage: boolean;
}

export interface AssetsResponse {
  assets: Asset[];

  pagination: AssetPagination;
}

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
    id: asset.id,

    ownerId: asset.ownerId,

    name: asset.name,

    type: getAssetType(
      asset.mimeType,
    ),

    mimeType: asset.mimeType,

    size: asset.size,

    status: asset.status,

    storage: asset.storage,

    thumbnailUrl: asset.thumbnailUrl,

    video720pUrl:
      asset.video720pUrl,

    video1080pUrl:
      asset.video1080pUrl,

    originalUrl:
      asset.originalUrl,

    createdAt: asset.createdAt,

    updatedAt: asset.updatedAt,
  };
};

export const AssetsService = {
  async fetchAllAssets({
    page = 1,
    limit = 6,
  }: {
    page?: number;
    limit?: number;
  }): Promise<AssetsResponse> {
    const token =
      localStorage.getItem("token");

    if (!token) {
      throw new Error(
        "Authentication required",
      );
    }

    const response = await apiClient(
      `/api/asset?page=${page}&limit=${limit}`,
      {
        method: "GET",
      },
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
        "Failed to fetch assets",
      );
    }

    return {
      assets: data.assets.map(
        mapAsset,
      ),

      pagination:
        data.pagination,
    };
  },

  async uploadAssets(
    files: File[],
  ): Promise<Asset[]> {

    const token =
      localStorage.getItem("token");

    if (!token) {
      throw new Error(
        "Authentication required",
      );
    }

    if (files.length === 0) { throw new Error("At least one file is required",); }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file,);
    });

    const response = await apiClient(
      `/api/asset`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        (
          data as {
            message?: string;
          }
        ).message ||
        "Failed to upload asset",
      );
    }
    return data.assets.map(mapAsset,);

  },
};