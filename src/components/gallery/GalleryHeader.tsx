import { UploadCloud } from "lucide-react";

interface GalleryHeaderProps {
  onUpload: () => void;
}

function GalleryHeader({
  onUpload,
}: GalleryHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-sm font-semibold text-indigo-600">
          Library
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Gallery
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Browse and manage your digital assets.
        </p>
      </div>

      <button
        type="button"
        onClick={onUpload}
        className="group flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/20 active:scale-[0.98]"
      >
        <UploadCloud className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
        Upload asset
      </button>
    </div>
  );
}

export default GalleryHeader;