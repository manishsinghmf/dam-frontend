function RecentAssetsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
        >
          <div className="aspect-4/3 animate-pulse bg-slate-100" />

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

export default RecentAssetsSkeleton;