import {
  File,
  FileAudio,
  FileImage,
  FileVideo,
  X,
} from "lucide-react";

interface SelectedFileItemProps {
  file: File;
  disabled: boolean;
  onRemove: (file: File) => void;
}

function SelectedFileItem({
  file,
  disabled,
  onRemove,
}: SelectedFileItemProps) {
  const getFileIcon = () => {
    if (file.type.startsWith("image/")) {
      return FileImage;
    }

    if (file.type.startsWith("video/")) {
      return FileVideo;
    }

    if (file.type.startsWith("audio/")) {
      return FileAudio;
    }

    return File;
  };

  const formatFileSize = (
    bytes: number,
  ) => {
    if (bytes === 0) {
      return "0 Bytes";
    }

    const units = [
      "Bytes",
      "KB",
      "MB",
      "GB",
    ];

    const index = Math.floor(
      Math.log(bytes) / Math.log(1024),
    );

    return `${(
      bytes /
      Math.pow(1024, index)
    ).toFixed(
      index === 0 ? 0 : 1,
    )} ${units[index]}`;
  };

  const FileIcon = getFileIcon();

  return (
    <div className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition-colors hover:border-indigo-200 hover:bg-indigo-50/30">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50">
        <FileIcon className="h-5 w-5 text-indigo-500" />
      </div>

      <div className="min-w-0 flex-1">
        <p
          title={file.name}
          className="truncate text-sm font-medium text-slate-700"
        >
          {file.name}
        </p>

        <div className="mt-1 flex items-center gap-2">
          <span className="text-[11px] text-slate-400">
            {formatFileSize(file.size)}
          </span>

          <span className="h-1 w-1 rounded-full bg-slate-300" />

          <span className="text-[11px] text-emerald-600">
            Ready
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onRemove(file)}
        disabled={disabled}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 opacity-60 transition-all hover:bg-red-50 hover:text-red-500 group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-30"
        aria-label={`Remove ${file.name}`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default SelectedFileItem;