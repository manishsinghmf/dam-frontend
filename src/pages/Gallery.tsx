import { useNavigate } from "react-router-dom";
import useGallery from "../hooks/useGallery";
import EmptyGallery from "../components/gallery/EmptyGallery";
import GalleryGrid from "../components/gallery/GalleryGrid";
import GalleryHeader from "../components/gallery/GalleryHeader";
import GalleryList from "../components/gallery/GalleryList";
import GalleryResultInfo from "../components/gallery/GalleryResultInfo";
import GallerySkeleton from "../components/gallery/GallerySkeleton";
import GalleryToolbar from "../components/gallery/GalleryToolbar";


function Gallery() {
  const navigate = useNavigate();

  const {
    filteredAssets,

    searchQuery,
    viewMode,
    filter,
    sortBy,

    isLoading,
    isRefreshing,

    hasFilters,

    setSearchQuery,
    setViewMode,
    setFilter,
    setSortBy,

    refreshAssets,
    clearFilters,
  } = useGallery();

  const handleUpload = () => {
    navigate("/assets");
  };

  return (
    <div className="mx-auto w-full max-w-7xl">
      <GalleryHeader
        onUpload={handleUpload}
      />

      <GalleryToolbar
        searchQuery={searchQuery}
        filter={filter}
        sortBy={sortBy}
        viewMode={viewMode}
        isRefreshing={isRefreshing}
        onSearchChange={setSearchQuery}
        onFilterChange={setFilter}
        onSortChange={setSortBy}
        onViewModeChange={setViewMode}
        onRefresh={refreshAssets}
      />

      <GalleryResultInfo
        count={filteredAssets.length}
        searchQuery={searchQuery}
        hasFilters={hasFilters}
        onClear={clearFilters}
      />

      {isLoading && (
        <GallerySkeleton />
      )}

      {!isLoading &&
        filteredAssets.length === 0 && (
          <EmptyGallery
            hasFilters={hasFilters}
            onClear={clearFilters}
            onUpload={handleUpload}
          />
        )}

      {!isLoading &&
        filteredAssets.length > 0 &&
        viewMode === "grid" && (
          <GalleryGrid
            assets={filteredAssets}
          />
        )}

      {!isLoading &&
        filteredAssets.length > 0 &&
        viewMode === "list" && (
          <GalleryList
            assets={filteredAssets}
          />
        )}
    </div>
  );
}

export default Gallery;