import {
  ImageIcon,
  UploadCloud,
  X,
} from "lucide-react";

interface EmptyGalleryProps {
  hasFilters: boolean;
  onClear: () => void;
  onUpload: () => void;
}

function EmptyGallery({
  hasFilters,
  onClear,
  onUpload,
}: EmptyGalleryProps) {
  return (
    <div className="flex min-h-75 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
        <ImageIcon className="h-6 w-6 text-indigo-500" />
      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-800">
        {hasFilters
          ? "No matching assets"
          : "No assets yet"}
      </h3>

      <p className="mt-2 max-w-sm text-xs leading-5 text-slate-400">
        {hasFilters
          ? "Try changing your search or filters to find the assets you are looking for."
          : "Upload your first asset to start building your digital asset library."}
      </p>

      {hasFilters ? (
        <button
          type="button"
          onClick={onClear}
          className="mt-5 flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          <X className="h-4 w-4" />
          Clear filters
        </button>
      ) : (
        <button
          type="button"
          onClick={onUpload}
          className="mt-5 flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
        >
          <UploadCloud className="h-4 w-4" />
          Upload asset
        </button>
      )}
    </div>
  );
}

export default EmptyGallery;