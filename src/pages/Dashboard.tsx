import {
  FileImage,
  FileVideo,
  Files,
  HardDrive,
  UploadCloud,
} from "lucide-react";

import useDashboard from "../hooks/useDashboard";

import StatCard from "../components/dashboard/StatCard";
import RecentAssets from "../components/dashboard/RecentAssets";
import StorageCard from "../components/dashboard/StorageCard";
import ProcessingCard from "../components/dashboard/ProcessingCard";

function Dashboard() {
  const {
    assets,
    isLoading,
    totalAssets,
    images,
    videos,
    processing,
    failed,
    ready,
    totalStorage,
  } = useDashboard();

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* Header */}
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
          href="/assets"
          className="group flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-600/20 active:scale-[0.98]"
        >
          <UploadCloud className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />

          Upload assets
        </a>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Assets"
          value={totalAssets.toString()}
          description="Files in your library"
          icon={Files}
        />

        <StatCard
          title="Images"
          value={images.toString()}
          description="Image assets"
          icon={FileImage}
        />

        <StatCard
          title="Videos"
          value={videos.toString()}
          description="Video assets"
          icon={FileVideo}
        />

        <StatCard
          title="Storage Used"
          value={formatFileSize(totalStorage)}
          description="Total asset storage"
          icon={HardDrive}
        />
      </div>

      {/* Dashboard content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <RecentAssets
          assets={assets}
          isLoading={isLoading}
        />

        <aside className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <StorageCard
            used={totalStorage}
            total={100 * 1024 * 1024 * 1024}
          />

          <ProcessingCard
            processing={processing}
            failed={failed}
            ready={ready}
          />
        </aside>
      </div>
    </div>
  );
}

function formatFileSize(bytes: number): string {
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

export default Dashboard;
