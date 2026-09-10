import {
  Grid3X3,
  List,
  RefreshCw,
  Search,
} from "lucide-react";

import type {
  AssetFilter,
  SortOption,
  ViewMode,
} from "../../hooks/useGallery";

interface GalleryToolbarProps {
  searchQuery: string;
  filter: AssetFilter;
  sortBy: SortOption;
  viewMode: ViewMode;
  isRefreshing: boolean;

  onSearchChange: (value: string) => void;
  onFilterChange: (value: AssetFilter) => void;
  onSortChange: (value: SortOption) => void;
  onViewModeChange: (value: ViewMode) => void;
  onRefresh: () => void;
}

function GalleryToolbar({
  searchQuery,
  filter,
  sortBy,
  viewMode,
  isRefreshing,
  onSearchChange,
  onFilterChange,
  onSortChange,
  onViewModeChange,
  onRefresh,
}: GalleryToolbarProps) {
  return (
    <div className="mb-5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <div className="relative min-w-0 flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="search"
            value={searchQuery}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search assets..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={filter}
            onChange={(event) =>
              onFilterChange(
                event.target.value as AssetFilter
              )
            }
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          >
            <option value="all">All types</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="audio">Audio</option>
            <option value="document">Documents</option>
          </select>

          <select
            value={sortBy}
            onChange={(event) =>
              onSortChange(
                event.target.value as SortOption
              )
            }
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="size-desc">Largest first</option>
          </select>

          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="flex h-10 items-center justify-center rounded-xl border border-slate-200 px-3 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Refresh assets"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""
                }`}
            />
          </button>

          <div className="flex h-10 rounded-xl border border-slate-200 p-1">
            <button
              type="button"
              onClick={() =>
                onViewModeChange("grid")
              }
              className={`flex items-center justify-center rounded-lg px-2.5 transition ${viewMode === "grid"
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                }`}
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() =>
                onViewModeChange("list")
              }
              className={`flex items-center justify-center rounded-lg px-2.5 transition ${viewMode === "list"
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                }`}
              aria-label="List view"
              aria-pressed={viewMode === "list"}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryToolbar;