import { Skeleton } from "@/components/ui/skeleton";

export const LoadingState = () => {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48 bg-slate-800" />
          <Skeleton className="h-10 w-32 bg-slate-800" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-64 bg-slate-800" />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48 bg-slate-800" />
          <Skeleton className="h-10 w-32 bg-slate-800" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-64 bg-slate-800" />
          ))}
        </div>
      </div>
    </div>
  );
};
