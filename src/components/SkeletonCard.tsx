
export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white p-6 rounded-xl">
      <div className="h-10 w-10 bg-gray-200 rounded mb-4" />
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-200 rounded w-full" />
    </div>
  );
}
