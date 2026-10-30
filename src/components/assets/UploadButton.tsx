import { UploadCloud } from "lucide-react";

interface UploadButtonProps {
  fileCount: number;
  isUploading: boolean;
}

function UploadButton({
  fileCount,
  isUploading,
}: UploadButtonProps) {
  return (
    <button
      type="submit"
      disabled={
        fileCount === 0 ||
        isUploading
      }
      className="group mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
    >
      <UploadCloud className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />

      {isUploading
        ? "Uploading..."
        : fileCount === 0
          ? "Select files to upload"
          : `Upload ${fileCount} ${fileCount === 1
            ? "asset"
            : "assets"
          }`}
    </button>
  );
}

export default UploadButton;