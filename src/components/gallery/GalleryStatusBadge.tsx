interface GalleryStatusBadgeProps {
  status: string;
}

function GalleryStatusBadge({
  status,
}: GalleryStatusBadgeProps) {
  const normalizedStatus =
    status.toLowerCase();

  if (
    normalizedStatus === "failed" ||
    normalizedStatus === "error"
  ) {
    return (
      <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold text-red-700">
        {status}
      </span>
    );
  }

  if (
    normalizedStatus === "processing" ||
    normalizedStatus === "pending"
  ) {
    return (
      <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
        {status}
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
      {status}
    </span>
  );
}

export default GalleryStatusBadge;