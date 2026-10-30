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

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  useEffect(() => {
    let isMounted = true;

    const loadAssets = async () => {
      try {
        const response = await AssetsService.fetchAllAssets({
          page: pagination.page,
          limit: pagination.limit,
        });

        if (isMounted) {
          setAssets(response.assets);
          setPagination(response.pagination);
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
  }, [pagination.limit, pagination.page]);

  const refreshAssets = async () => {
    try {
      setIsRefreshing(true);

      const response = await AssetsService.fetchAllAssets({
        page: pagination.page,
        limit: pagination.limit,
      });

      setAssets(response.assets);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Error refreshing gallery assets:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const goToPage = (nextPage: number) => {
    if (
      !Number.isInteger(nextPage) ||
      nextPage < 1 ||
      nextPage > pagination.totalPages
    ) {
      return;
    }

    setPagination((current) => ({
      ...current,
      page: nextPage,
    }));
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
      result = result.filter(
        (asset) => asset.type === filter
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
          return (
            new Date(first.createdAt).getTime() -
            new Date(second.createdAt).getTime()
          );

        case "newest":
        default:
          return (
            new Date(second.createdAt).getTime() -
            new Date(first.createdAt).getTime()
          );
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
    pagination,
    goToPage,
  };
}

export default useGallery;