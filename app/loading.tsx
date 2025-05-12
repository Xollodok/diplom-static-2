import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-12 w-48 mb-8" />

      <div className="space-y-16">
        {/* Hero skeleton */}
        <Skeleton className="h-[400px] w-full" />

        {/* Featured products skeleton */}
        <div>
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-6 w-96 mb-8" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[300px] w-full" />
            ))}
          </div>
        </div>

        {/* Categories skeleton */}
        <div>
          <Skeleton className="h-10 w-64 mb-4 mx-auto" />
          <Skeleton className="h-6 w-96 mb-8 mx-auto" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[300px] w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
