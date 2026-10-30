import AssetUploader from "../components/assets/AssetUploader";

function AssetLibrary() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Asset Library</h1>
      <AssetUploader />
    </div>
  );
}

export default AssetLibrary;