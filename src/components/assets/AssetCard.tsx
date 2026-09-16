import { useEffect, useRef, useState } from "react";

import {
  File,
  FileAudio,
  FileText,
  FileVideo,
  MoreHorizontal,
  Image as ImageIcon,
  HardDrive,
  Play,
  Check,
} from "lucide-react";

import type { Asset } from "../../types/Assets";

type AssetCardProps = {
  asset: Asset;
};

type AssetIconProps = {
  type?: string;
  className?: string;
};

type VideoQuality =
  | "1080p"
  | "720p"
  | "original";

const AssetIcon = ({
  type,
  className,
}: AssetIconProps) => {
  const assetType = type?.toLowerCase() ?? "";

  if (assetType.includes("image")) {
    return <ImageIcon className={className} />;
  }

  if (assetType.includes("video")) {
    return <FileVideo className={className} />;
  }

  if (assetType.includes("audio")) {
    return <FileAudio className={className} />;
  }

  if (
    assetType.includes("pdf") ||
    assetType.includes("document") ||
    assetType.includes("text")
  ) {
    return <FileText className={className} />;
  }

  return <File className={className} />;
};

function AssetCard({
  asset,
}: AssetCardProps) {
  const [isQualityMenuOpen, setIsQualityMenuOpen] =
    useState(false);

  const [selectedQuality, setSelectedQuality] =
    useState<VideoQuality>("720p");

  const menuRef = useRef<HTMLDivElement>(null);

  const formatFileSize = (
    bytes: number,
  ): string => {
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
      bytes / Math.pow(1024, index)
    ).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
  };

  const getStatusStyle = () => {
    switch (asset.status?.toLowerCase()) {
      case "completed":
      case "ready":
      case "success":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/10";

      case "processing":
      case "pending":
        return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/10";

      case "failed":
      case "error":
        return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10";

      default:
        return "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/10";
    }
  };

  const isVideo =
    asset.type?.toLowerCase() === "video";

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsQualityMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  const getVideoUrl = (): string | null => {
    switch (selectedQuality) {
      case "1080p":
        return asset.video1080pUrl;

      case "720p":
        return asset.video720pUrl;

      case "original":
        return asset.originalUrl;

      default:
        return null;
    }
  };

  const videoUrl = isVideo
    ? getVideoUrl()
    : null;

  const qualityOptions: {
    value: VideoQuality;
    label: string;
    url?: string | null;
  }[] = [
      {
        value: "1080p",
        label: "1080p",
        url: asset.video1080pUrl,
      },
      {
        value: "720p",
        label: "720p",
        url: asset.video720pUrl,
      },
      {
        value: "original",
        label: "Original",
        url: asset.originalUrl,
      },
    ];

  const availableQualityOptions =
    qualityOptions.filter(
      (option) => option.url,
    );

  const handleQualityChange = (
    quality: VideoQuality,
  ) => {
    setSelectedQuality(quality);
    setIsQualityMenuOpen(false);
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-slate-200/60">
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        {isVideo && videoUrl ? (

          <video
            key={videoUrl}
            src={videoUrl ?? undefined}
            poster={asset.thumbnailUrl ?? undefined}
            controls
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : asset.thumbnailUrl ? (
          <img
            src={asset.thumbnailUrl}
            alt={asset.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-slate-50 to-slate-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
              <AssetIcon
                type={asset.type}
                className="h-7 w-7 text-indigo-500"
              />
            </div>

            <p className="mt-3 text-xs font-medium text-slate-400">
              No preview available
            </p>
          </div>
        )}

        {isVideo &&
          asset.thumbnailUrl &&
          !videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
                <Play className="ml-0.5 h-5 w-5 fill-current text-slate-800" />
              </div>
            </div>
          )}

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Type badge */}
        <div className="absolute left-3 top-3">
          <span className="rounded-lg bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-600 shadow-sm backdrop-blur-sm">
            {asset.type?.split("/").pop() ??
              "FILE"}
          </span>
        </div>

        {/* Top-right menu */}
        <div
          ref={menuRef}
          className="absolute right-3 top-3"
        >
          <button
            type="button"
            aria-label={`Actions for ${asset.name}`}
            aria-expanded={
              isQualityMenuOpen
            }
            onClick={() =>
              setIsQualityMenuOpen(
                (current) => !current,
              )
            }
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-slate-500 shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-slate-900"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>

          {/* Video quality dropdown */}
          {isVideo &&
            isQualityMenuOpen && (
              <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
                <div className="border-b border-slate-100 px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Video Quality
                  </p>
                </div>

                {availableQualityOptions.map(
                  (option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        handleQualityChange(
                          option.value,
                        )
                      }
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      <span>
                        {option.label}
                      </span>

                      {selectedQuality ===
                        option.value && (
                          <Check className="h-3.5 w-3.5 text-indigo-600" />
                        )}
                    </button>
                  ),
                )}

                {availableQualityOptions.length ===
                  0 && (
                    <p className="px-3 py-3 text-xs text-slate-400">
                      No video variants available
                    </p>
                  )}
              </div>
            )}
        </div>
      </div>

      <div className="p-4">
        {/* Name */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              title={asset.name}
              className="truncate text-sm font-semibold text-slate-800"
            >
              {asset.name}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              {asset.type ||
                "Unknown file type"}
            </p>
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <HardDrive className="h-3.5 w-3.5 text-slate-400" />

            {formatFileSize(asset.size)}
          </div>

          <div className="h-1 w-1 rounded-full bg-slate-300" />

          <span className="text-xs text-slate-400">
            Asset
          </span>
        </div>

        <div className="mt-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusStyle()}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${asset.status?.toLowerCase() ===
                "processing" ||
                asset.status?.toLowerCase() ===
                "pending"
                ? "animate-pulse bg-amber-500"
                : asset.status?.toLowerCase() ===
                  "failed" ||
                  asset.status?.toLowerCase() ===
                  "error"
                  ? "bg-red-500"
                  : "bg-emerald-500"
                }`}
            />

            {asset.status}
          </span>
        </div>
      </div>
    </article>
  );
}

export default AssetCard;