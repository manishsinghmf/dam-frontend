import { useEffect, useState } from "react";

import { AssetsService, type AssetStatistics } from "../services/AssetsService";
import type {
  Asset,
} from "../types/Assets";

const INITIAL_STATISTICS: AssetStatistics = {
  totalAssets: 0,
  images: 0,
  videos: 0,
  processing: 0,
  failed: 0,
  ready: 0,
  totalStorage: 0,
};

function useDashboard() {
  const [assets, setAssets] =
    useState<Asset[]>([]);

  const [statistics, setStatistics] =
    useState<AssetStatistics>(
      INITIAL_STATISTICS,
    );

  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        const response =
          await AssetsService.fetchAllAssets({
            page: 1,
            limit: 6,
          });

        if (!isMounted) {
          return;
        }

        setAssets(response.assets);
        setStatistics(response.statistics);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.error(
          "Error fetching dashboard assets:",
          error,
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    assets,
    isLoading,

    totalAssets:
      statistics.totalAssets,

    images:
      statistics.images,

    videos:
      statistics.videos,

    processing:
      statistics.processing,

    failed:
      statistics.failed,

    ready:
      statistics.ready,

    totalStorage:
      statistics.totalStorage,
  };
}

export default useDashboard;