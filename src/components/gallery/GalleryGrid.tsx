import type { Asset } from "../../types/Assets";
import AssetCard from "../assets/AssetCard";

interface GalleryGridProps {
  assets: Asset[];
}

function GalleryGrid({
  assets,
}: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          asset={asset}
        />
      ))}
    </div>
  );
}

export default GalleryGrid;