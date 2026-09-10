import { useEffect, useMemo, useState } from "react";
import {
  Filter,
  Grid2X2,
  Image as ImageIcon,
  List,
  RefreshCw,
  Search,
  SlidersHorizontal,
  UploadCloud,
} from "lucide-react";

import { AssetsService } from "../services/AssetsService";
import type { Asset } from "../types/Assets";
import AssetCard from "../components/assets/AssetCard";
type ViewMode = "grid" | "list";

type SortOption =
  | "newest"
  | "oldest"
  | "name-asc"
  | "name-desc"
  | "size-desc";

type AssetFilter = "all" | "image" | "video" | "audio" | "document";

function Gallery() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filter, setFilter] = useState<AssetFilter>("all");
  const [sortBy, setSortBy] =
    useState<SortOption>("newest");

  const [isLoading, setIsLoading] =
    useState<boolean>(true);

  const [isRefreshing, setIsRefreshing] =
    useState<boolean>(false);

  const fetchAssets = async () => {
    try {
      setIsLoading(true);

      const response: Asset[] =
        await AssetsService.fetchAllAssets();

      setAssets(response);
    } catch (error) {
      console.error("Error fetching assets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshAssets = async () => {
    try {
      setIsRefreshing(true);

      const response: Asset[] =
        await AssetsService.fetchAllAssets();

      setAssets(response);
    } catch (error) {
      console.error("Error refreshing assets:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const filteredAssets = useMemo(() => {
    let result = [...assets];

    /* Search */
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();

      result = result.filter((asset) =>
        asset.name.toLowerCase().includes(query)
      );
    }

    /* Type filter */
    if (filter !== "all") {
      result = result.filter((asset) =>
        asset.type
          ?.toLowerCase()
          .startsWith(`${filter}/`)
      );
    }

    /* Sort */
    result.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);

        case "name-desc":
          return b.name.localeCompare(a.name);

        case "size-desc":
          return b.size - a.size;

        case "oldest":
          return a.id - b.id;

        case "newest":
        default:
          return b.id - a.id;
      }
    });

    return result;
  }, [
    assets,
    searchQuery,
    filter,
    sortBy,
  ]);

  return (
    <div className="mx-auto w-full max-w-7xl">

      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-indigo-600" />

            <span className="text-sm font-semibold text-indigo-600">
              Asset Management
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Asset Library
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Browse, search and manage your digital assets.
          </p>
        </div>

        <a
          href="/assets"
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
        >
          <UploadCloud className="h-4 w-4" />

          Upload assets
        </a>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm">

        <div className="flex flex-col gap-3 xl:flex-row">

          {/* Search */}
          <div className="relative flex-1">

            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search assets by name..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          <div className="flex flex-wrap gap-2">

            {/* Type filter */}
            <div className="relative">
              <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <select
                value={filter}
                onChange={(event) =>
                  setFilter(
                    event.target.value as AssetFilter
                  )
                }
                className="h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-9 text-sm font-medium text-slate-600 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              >
                <option value="all">All types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="audio">Audio</option>
                <option value="document">Documents</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(
                    event.target.value as SortOption
                  )
                }
                className="h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-9 text-sm font-medium text-slate-600 outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="name-asc">Name A–Z</option>
                <option value="name-desc">Name Z–A</option>
                <option value="size-desc">
                  Largest first
                </option>
              </select>
            </div>

            {/* Refresh */}
            <button
              type="button"
              onClick={refreshAssets}
              disabled={isRefreshing}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50"
              aria-label="Refresh assets"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing
                  ? "animate-spin"
                  : ""
                  }`}
              />
            </button>

            {/* View mode */}
            <div className="flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50 p-1">

              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${viewMode === "grid"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
                  }`}
                aria-label="Grid view"
              >
                <Grid2X2 className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${viewMode === "list"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
                  }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          RESULT INFO
      ========================================================= */}
      <div className="mb-5 flex items-center justify-between">

        <div>
          <p className="text-sm font-semibold text-slate-800">
            {filteredAssets.length}{" "}
            {filteredAssets.length === 1
              ? "asset"
              : "assets"}
          </p>

          {searchQuery && (
            <p className="mt-0.5 text-xs text-slate-400">
              Results for "{searchQuery}"
            </p>
          )}
        </div>

        {(searchQuery || filter !== "all") && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setFilter("all");
            }}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* ========================================================
          LOADING
      ========================================================= */}
      {isLoading && <GallerySkeleton />}

      {/* ========================================================
          EMPTY
      ========================================================= */}
      {!isLoading &&
        filteredAssets.length === 0 && (
          <EmptyGallery
            hasFilters={
              Boolean(searchQuery) ||
              filter !== "all"
            }
            onClear={() => {
              setSearchQuery("");
              setFilter("all");
            }}
          />
        )}

      {/* ========================================================
          GRID
      ========================================================= */}
      {!isLoading &&
        filteredAssets.length > 0 &&
        viewMode === "grid" && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
              />
            ))}
          </div>
        )}

      {/* ========================================================
          LIST
      ========================================================= */}
      {!isLoading &&
        filteredAssets.length > 0 &&
        viewMode === "list" && (
          <AssetList assets={filteredAssets} />
        )}
    </div>
  );
}

/* ================================================================
   LIST
================================================================ */

function AssetList({
  assets,
}: {
  assets: Asset[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="hidden grid-cols-[1fr_180px_120px_120px] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 md:grid">
        <span>Asset</span>
        <span>Type</span>
        <span>Size</span>
        <span>Status</span>
      </div>

      <div className="divide-y divide-slate-100">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="grid grid-cols-1 gap-3 px-5 py-4 transition hover:bg-slate-50 md:grid-cols-[1fr_180px_120px_120px] md:items-center"
          >
            <div className="flex min-w-0 items-center gap-3">

              <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                {asset.thumbnailUrl ? (
                  <img
                    src={asset.thumbnailUrl}
                    alt={asset.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="h-5 w-5 text-slate-400" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-700">
                  {asset.name}
                </p>

                <p className="mt-0.5 truncate text-xs text-slate-400">
                  {asset.type}
                </p>
              </div>
            </div>

            <span className="text-xs text-slate-500">
              {asset.type}
            </span>

            <span className="text-xs text-slate-500">
              {formatFileSize(asset.size)}
            </span>

            <span>
              <StatusBadge status={asset.status} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   STATUS BADGE
================================================================ */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const normalizedStatus =
    status?.toLowerCase();

  const isProcessing =
    normalizedStatus === "processing" ||
    normalizedStatus === "pending";

  const isFailed =
    normalizedStatus === "failed" ||
    normalizedStatus === "error";

  if (isFailed) {
    return (
      <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-700">
        {status}
      </span>
    );
  }

  if (isProcessing) {
    return (
      <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
        {status}
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
      {status}
    </span>
  );
}

/* ================================================================
   SKELETON
================================================================ */

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
        >
          <div className="aspect-[4/3] animate-pulse bg-slate-100" />

          <div className="space-y-3 p-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================================================================
   EMPTY
================================================================ */

function EmptyGallery({
  hasFilters,
  onClear,
}: {
  hasFilters: boolean;
  onClear: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 text-center">

      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
        <ImageIcon className="h-7 w-7 text-indigo-500" />
      </div>

      <h2 className="mt-5 text-lg font-bold text-slate-800">
        {hasFilters
          ? "No matching assets"
          : "Your library is empty"}
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
        {hasFilters
          ? "Try changing your search or filters to find what you're looking for."
          : "Upload your first asset to start building your digital library."}
      </p>

      {hasFilters ? (
        <button
          type="button"
          onClick={onClear}
          className="mt-5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm hover:bg-slate-50"
        >
          Clear filters
        </button>
      ) : (
        <a
          href="/assets/upload"
          className="mt-5 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700"
        >
          <UploadCloud className="h-4 w-4" />
          Upload your first asset
        </a>
      )}
    </div>
  );
}

/* ================================================================
   FILE SIZE
================================================================ */

function formatFileSize(bytes: number): string {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const units = ["Bytes", "KB", "MB", "GB", "TB"];

  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  return `${(bytes / Math.pow(1024, index)).toFixed(
    index === 0 ? 0 : 1
  )} ${units[index]}`;
}

export default Gallery;