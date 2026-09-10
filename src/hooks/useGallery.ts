import { useEffect, useState } from "react";
import type { Asset } from "../types/Assets";
import { AssetsService } from "../services/AssetsService";

export type ViewMode = "grid" | "list";

export type AssetFilter =
  | "all"
  | "image"
  | "video"
  | "audio"
  | "document";

export type SortOption =
  | "newest"
  | "oldest"
  | "name-asc"
  | "name-desc"
  | "size-desc";

function useGallery() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filter, setFilter] = useState<AssetFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadAssets = async () => {
      try {
        const response = await AssetsService.fetchAllAssets();

        if (isMounted) {
          setAssets(response);
        }
      } catch (error) {
        console.error("Error fetching gallery assets:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadAssets();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshAssets = async () => {
    try {
      setIsRefreshing(true);

      const response = await AssetsService.fetchAllAssets();

      setAssets(response);
    } catch (error) {
      console.error("Error refreshing gallery assets:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilter("all");
  };

  const getFilteredAssets = () => {
    let result = [...assets];

    const query = searchQuery.trim().toLowerCase();

    if (query) {
      result = result.filter((asset) =>
        asset.name.toLowerCase().includes(query)
      );
    }

    if (filter !== "all") {
      result = result.filter((asset) =>
        asset.type?.toLowerCase().startsWith(`${filter}/`)
      );
    }

    result.sort((first, second) => {
      switch (sortBy) {
        case "name-asc":
          return first.name.localeCompare(second.name);

        case "name-desc":
          return second.name.localeCompare(first.name);

        case "size-desc":
          return second.size - first.size;

        case "oldest":
          return first.id - second.id;

        case "newest":
        default:
          return second.id - first.id;
      }
    });

    return result;
  };

  const filteredAssets = getFilteredAssets();

  const hasFilters =
    searchQuery.trim().length > 0 || filter !== "all";

  return {
    filteredAssets,

    searchQuery,
    viewMode,
    filter,
    sortBy,

    isLoading,
    isRefreshing,

    hasFilters,

    setSearchQuery,
    setViewMode,
    setFilter,
    setSortBy,

    refreshAssets,
    clearFilters,
  };
}

export default useGallery;