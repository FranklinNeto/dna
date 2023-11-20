
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
    return (
        <Skeleton className="space-y-2  w-[100%] p-4 mb-4 rounded-lg">
          <Skeleton className="h-4 w-[40px]" />
          <Skeleton className="h-4 w-[60vw]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-8 w-20 " />
        </Skeleton>
      
    )
  }