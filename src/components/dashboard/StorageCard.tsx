import { HardDrive } from "lucide-react";

interface StorageCardProps {
  used: number;
  total: number;
}

function StorageCard({
  used,
  total,
}: StorageCardProps) {
  const percentage = Math.min(
    Math.round((used / total) * 100),
    100
  );

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800">
            Storage
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Your workspace storage
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50">
          <HardDrive className="h-4 w-4 text-indigo-600" />
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-end justify-between">
          <span className="text-sm font-semibold text-slate-700">
            {formatFileSize(used)}
          </span>

          <span className="text-xs text-slate-400">
            {formatFileSize(total)}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="mt-3 text-xs text-slate-400">
          {percentage}% of your storage is currently used.
        </p>
      </div>
    </div>
  );
}

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

export default StorageCard;