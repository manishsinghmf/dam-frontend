import SelectedFileItem from "./SelectedFileItem";

interface SelectedFilesProps {
  files: File[];
  isUploading: boolean;
  onRemove: (file: File) => void;
}

function SelectedFiles({
  files,
  isUploading,
  onRemove,
}: SelectedFilesProps) {
  if (files.length === 0) {
    return null;
  }

  return (
    <div className="mt-7">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">
            Selected files
          </h3>

          <p className="mt-0.5 text-xs text-slate-400">
            Ready to upload to your library
          </p>
        </div>

        <span className="text-xs font-medium text-slate-400">
          {files.length}{" "}
          {files.length === 1
            ? "item"
            : "items"}
        </span>
      </div>

      <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
        {files.map((file) => (
          <SelectedFileItem
            key={`${file.name}-${file.size}-${file.lastModified}`}
            file={file}
            disabled={isUploading}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}

export default SelectedFiles;