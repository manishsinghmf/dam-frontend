import { X } from "lucide-react";

interface GalleryResultInfoProps {
  count: number;
  searchQuery: string;
  hasFilters: boolean;
  onClear: () => void;
}

function GalleryResultInfo({
  count,
  searchQuery,
  hasFilters,
  onClear,
}: GalleryResultInfoProps) {
  return (
    <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-700">
          {count}
        </span>{" "}
        {count === 1 ? "asset" : "assets"}
        {searchQuery && (
          <>
            {" "}
            matching{" "}
            <span className="font-medium text-slate-700">
              "{searchQuery}"
            </span>
          </>
        )}
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1.5 self-start text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
        >
          <X className="h-3.5 w-3.5" />
          Clear filters
        </button>
      )}
    </div>
  );
}

export default GalleryResultInfo;