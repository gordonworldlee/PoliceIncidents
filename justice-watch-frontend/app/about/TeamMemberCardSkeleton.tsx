import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function TeamMemberCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 mb-4">
          <Skeleton circle className="h-full" />
        </div>
        <div className="w-full text-center">
          <Skeleton className="w-3/4 mx-auto" />
          <Skeleton className="w-1/2 mx-auto" />
          <Skeleton className="w-1/3 mx-auto" />
          <Skeleton count={3} className="w-full" />
        </div>
        <div className="grid grid-cols-2 gap-2 w-full">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-16" />
          ))}
        </div>
      </div>
    </div>
  );
}
