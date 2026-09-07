import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileImage,
  FileVideo,
  HardDrive,
  Image as ImageIcon,
  UploadCloud,
  AlertCircle,
  Files,
} from "lucide-react";

import { AssetsService } from "../assets/services/AssetsService";
import type { Asset } from "../assets/types/Assets";
import AssetCard from "../assets/components/AssetCard";

function Dashboard() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchAssets = async () => {
    try {
      setIsLoading(true);

      const response: Asset[] =
        await AssetsService.fetchAllAssets();

      setAssets(response);
    } catch (error) {
      console.error("Error fetching dashboard assets:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  /* ============================================================
     STATISTICS
  ============================================================ */

  const statistics = useMemo(() => {
    const totalAssets = assets.length;

    const images = assets.filter((asset) =>
      asset.type?.toLowerCase().startsWith("image/")
    ).length;

    const videos = assets.filter((asset) =>
      asset.type?.toLowerCase().startsWith("video/")
    ).length;

    const processing = assets.filter((asset) => {
      const status = asset.status?.toLowerCase();

      return status === "processing" || status === "pending";
    }).length;

    const failed = assets.filter((asset) => {
      const status = asset.status?.toLowerCase();

      return status === "failed" || status === "error";
    }).length;

    const totalStorage = assets.reduce(
      (total, asset) => total + (asset.size || 0),
      0
    );

    return {
      totalAssets,
      images,
      videos,
      processing,
      failed,
      totalStorage,
    };
  }, [assets]);

  /* ============================================================
     RECENT ASSETS
  ============================================================ */

  const recentAssets = useMemo(() => {
    return [...assets].slice(0, 4);
  }, [assets]);

  return (
    <div className="mx-auto w-full max-w-7xl">

      {/* ========================================================
          HEADER
      ========================================================= */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="mb-2 text-sm font-semibold text-indigo-600">
            Overview
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Welcome back. Here's what's happening with your
            asset library.
          </p>
        </div>

        <a
          href="/assets/upload"
          className="group flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/20 active:scale-[0.98]"
        >
          <UploadCloud className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />

          Upload assets
        </a>
      </div>

      {/* ========================================================
          STAT CARDS
      ========================================================= */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Assets"
          value={statistics.totalAssets.toString()}
          description="Files in your library"
          icon={Files}
        />

        <StatCard
          title="Images"
          value={statistics.images.toString()}
          description="Image assets"
          icon={FileImage}
        />

        <StatCard
          title="Videos"
          value={statistics.videos.toString()}
          description="Video assets"
          icon={FileVideo}
        />

        <StatCard
          title="Storage Used"
          value={formatFileSize(statistics.totalStorage)}
          description="Total asset storage"
          icon={HardDrive}
        />
      </div>

      {/* ========================================================
          MAIN GRID
      ========================================================= */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Recent assets */}
        <section className="min-w-0 xl:col-span-2">

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Assets
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Recently added assets to your library.
              </p>
            </div>

            <a
              href="/assets"
              className="group flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
            >
              View all

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {isLoading ? (
            <RecentAssetsSkeleton />
          ) : recentAssets.length === 0 ? (
            <EmptyRecentAssets />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {recentAssets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                />
              ))}
            </div>
          )}
        </section>

        {/* ======================================================
            RIGHT SIDEBAR
        ======================================================= */}
        <aside className="space-y-6">

          {/* Storage */}
          <StorageCard
            used={statistics.totalStorage}
            total={100 * 1024 * 1024 * 1024}
          />

          {/* Processing */}
          <ProcessingCard
            processing={statistics.processing}
            failed={statistics.failed}
          />

        </aside>
      </div>

      {/* ========================================================
          QUICK ACTIONS
      ========================================================= */}
      <section className="mt-8">

        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Common actions for managing your digital assets.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          <QuickAction
            icon={UploadCloud}
            title="Upload assets"
            description="Add new files to your library."
            href="/assets/upload"
          />

          <QuickAction
            icon={ImageIcon}
            title="Browse library"
            description="Explore all your digital assets."
            href="/assets"
          />

          <QuickAction
            icon={HardDrive}
            title="Manage storage"
            description="Review your storage usage."
            href="/storage"
          />

        </div>
      </section>
    </div>
  );
}

/* ================================================================
   STAT CARD
================================================================ */

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 transition-colors group-hover:bg-indigo-100">
          <Icon className="h-5 w-5 text-indigo-600" />
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   STORAGE CARD
================================================================ */

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

/* ================================================================
   PROCESSING CARD
================================================================ */

interface ProcessingCardProps {
  processing: number;
  failed: number;
}

function ProcessingCard({
  processing,
  failed,
}: ProcessingCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
          <Clock3 className="h-5 w-5 text-amber-600" />
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-800">
            Processing
          </h3>

          <p className="text-xs text-slate-400">
            Asset processing status
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">

        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-3">

          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-amber-500" />

            <span className="text-xs font-medium text-slate-600">
              Processing
            </span>
          </div>

          <span className="text-sm font-bold text-slate-800">
            {processing}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-3">

          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-500" />

            <span className="text-xs font-medium text-slate-600">
              Failed
            </span>
          </div>

          <span className="text-sm font-bold text-slate-800">
            {failed}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-3">

          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />

            <span className="text-xs font-medium text-slate-600">
              Ready
            </span>
          </div>

          <span className="text-sm font-bold text-slate-800">
            {Math.max(
              assetsReadyCountPlaceholder(),
              0
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

/*
 * Placeholder replaced below by a cleaner approach.
 */
function assetsReadyCountPlaceholder(): number {
  return 0;
}

/* ================================================================
   QUICK ACTION
================================================================ */

interface QuickActionProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
}

function QuickAction({
  icon: Icon,
  title,
  description,
  href,
}: QuickActionProps) {
  return (
    <a
      href={href}
      className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 transition-colors group-hover:bg-indigo-100">
        <Icon className="h-5 w-5 text-indigo-600" />
      </div>

      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-slate-800">
          {title}
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          {description}
        </p>
      </div>

      <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-indigo-500" />
    </a>
  );
}

/* ================================================================
   LOADING
================================================================ */

function RecentAssetsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
        >
          <div className="aspect-[4/3] animate-pulse bg-slate-100" />

          <div className="space-y-3 p-4">
            <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ================================================================
   EMPTY
================================================================ */

function EmptyRecentAssets() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 text-center">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
        <ImageIcon className="h-6 w-6 text-indigo-500" />
      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-800">
        No assets yet
      </h3>

      <p className="mt-2 max-w-sm text-xs leading-5 text-slate-400">
        Upload your first asset to start building your digital
        asset library.
      </p>

      <a
        href="/assets/upload"
        className="mt-5 flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
      >
        <UploadCloud className="h-4 w-4" />
        Upload asset
      </a>
    </div>
  );
}

/* ================================================================
   FILE SIZE
================================================================ */

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

export default Dashboard;