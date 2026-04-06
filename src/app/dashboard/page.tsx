import { JobCard } from "@/components/job-card";
import { FilterBar } from "@/components/filter-bar";
import { getJobsFromIndia } from "@/lib/jobs";
import { getFollowedCompaniesAction } from "@/app/actions/alerts";
import { Badge } from "@/components/ui/badge";
import { Zap, Bell } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const latestJobs = await getJobsFromIndia();
  const bigTechJobs = await getJobsFromIndia({ bigTech: true });
  const followed = await getFollowedCompaniesAction();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Job Feed</h1>
          <div className="flex items-center gap-2">
            <p className="text-muted-foreground text-lg">
              We found {latestJobs.length} new jobs matching your profile in India & Remote.
            </p>
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>
        
        {followed.length > 0 && (
          <Link href="/alerts" className="flex items-center gap-3 p-3 rounded-xl border bg-primary/5 border-primary/10 hover:bg-primary/10 transition-colors group">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bell className="h-4 w-4 text-primary animate-tada" />
            </div>
            <div>
              <p className="text-xs font-semibold text-primary">Active Alerts</p>
              <p className="text-[10px] text-primary/70">Tracking {followed.length} companies</p>
            </div>
          </Link>
        )}
      </div>

      <FilterBar />

      <div className="space-y-6">
        <div className="flex items-center gap-2 px-1">
          <Zap className="h-4 w-4 text-orange-500 fill-orange-500" />
          <h2 className="font-bold tracking-tight">Big Tech Priority</h2>
          <Badge variant="secondary" className="px-1.5 py-0 text-[10px] uppercase font-bold">New</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {bigTechJobs.length > 0 ? (
            bigTechJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center border border-dashed rounded-2xl bg-muted/10">
              <p className="text-muted-foreground text-sm">Scanning for Apple, Google & Meta openings...</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6 pt-4">
        <h2 className="font-bold tracking-tight px-1">Recent Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {latestJobs.length > 0 ? (
            latestJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed rounded-2xl">
              <p className="text-muted-foreground">No new jobs found right now. Check back in a few minutes!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
