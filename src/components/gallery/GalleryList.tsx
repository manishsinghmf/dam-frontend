import {
  File,
  FileAudio,
  FileImage,
  FileVideo,
} from "lucide-react";

import type { Asset } from "../../types/Assets";

interface GalleryListProps {
  assets: Asset[];
}

function GalleryList({
  assets,
}: GalleryListProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-175">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Asset
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Type
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Size
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {assets.map((asset) => (
              <GalleryListItem
                key={asset.id}
                asset={asset}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface GalleryListItemProps {
  asset: Asset;
}

function GalleryListItem({
  asset,
}: GalleryListItemProps) {

  const Icon =
    asset.type === "image"
      ? FileImage
      : asset.type === "video"
        ? FileVideo
        : asset.type === "audio"
          ? FileAudio
          : File;

  return (
    <tr className="transition-colors hover:bg-slate-50/70">
      <td className="px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
            <Icon className="h-5 w-5 text-indigo-600" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {asset.name}
            </p>

            <p className="mt-0.5 text-xs text-slate-400">
              Asset #{asset.id}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4">
        <span className="text-sm text-slate-600">
          {asset.type || "Unknown"}
        </span>
      </td>

      <td className="px-5 py-4">
        <span className="text-sm text-slate-600">
          {formatFileSize(asset.size)}
        </span>
      </td>

      <td className="px-5 py-4">
        <StatusBadge status={asset.status} />
      </td>
    </tr>
  );
}

interface StatusBadgeProps {
  status?: string;
}

function StatusBadge({
  status,
}: StatusBadgeProps) {
  const normalizedStatus =
    status?.toLowerCase() ?? "unknown";

  const styles =
    normalizedStatus === "ready"
      ? "bg-emerald-50 text-emerald-700"
      : normalizedStatus === "processing" ||
        normalizedStatus === "pending"
        ? "bg-amber-50 text-amber-700"
        : normalizedStatus === "failed" ||
          normalizedStatus === "error"
          ? "bg-red-50 text-red-700"
          : "bg-slate-100 text-slate-600";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles}`}
    >
      {status || "Unknown"}
    </span>
  );
}

function formatFileSize(
  bytes: number
): string {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const units = [
    "Bytes",
    "KB",
    "MB",
    "GB",
    "TB",
  ];

  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  return `${(
    bytes / Math.pow(1024, index)
  ).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

export default GalleryList;