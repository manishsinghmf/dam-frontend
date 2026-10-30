import { ArrowRight } from "lucide-react";
import type { Asset } from "../../types/Assets";
import AssetCard from "../assets/AssetCard";
import RecentAssetsSkeleton from "./RecentAssetsSkeleton";
import EmptyRecentAssets from "./EmptyRecentAssets";

interface RecentAssetsProps {
  assets: Asset[];
  isLoading: boolean;
}

function RecentAssets({
  assets,
  isLoading,
}: RecentAssetsProps) {
  const recentAssets = assets.slice(0, 4);

  return (
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
          href="/gallery"
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
  );
}

export default RecentAssets;