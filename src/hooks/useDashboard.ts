import { useEffect, useState } from "react";

import { AssetsService } from "../services/AssetsService";
import type { Asset } from "../types/Assets";

function useDashboard() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchAssets = async () => {
      try {
        const response = await AssetsService.fetchAllAssets({
          page: 1,
          limit: 6,
        });

        if (isMounted) {
          setAssets(response.assets);
        }
      } catch (error) {
        console.error(
          "Error fetching dashboard assets:",
          error
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAssets();

    return () => {
      isMounted = false;
    };
  }, []);

  const totalAssets = assets.length;

  const images = assets.filter(
    (asset) => asset.type === "image"
  ).length;

  const videos = assets.filter(
    (asset) => asset.type === "video"
  ).length;

  const processing = assets.filter((asset) => {
    const status = asset.status?.toLowerCase();

    return (
      status === "processing" ||
      status === "pending"
    );
  }).length;

  const failed = assets.filter((asset) => {
    const status = asset.status?.toLowerCase();

    return (
      status === "failed" ||
      status === "error"
    );
  }).length;

  const ready = assets.filter(
    (asset) => asset.status?.toLowerCase() === "ready"
  ).length;

  const totalStorage = assets.reduce(
    (total, asset) => total + (asset.size || 0),
    0
  );

  return {
    assets,
    isLoading,

    totalAssets,
    images,
    videos,
    processing,
    failed,
    ready,
    totalStorage,
  };
}

export default useDashboard;