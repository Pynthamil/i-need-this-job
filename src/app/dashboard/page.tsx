import { JobCard } from "@/components/job-card";
import { FilterBar } from "@/components/filter-bar";
import { getJobsFromIndia } from "@/lib/jobs";

export default async function DashboardPage() {
  const latestJobs = await getJobsFromIndia();

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Job Feed</h1>
        <div className="flex items-center gap-2">
          <p className="text-muted-foreground text-lg">
            We found {latestJobs.length} new jobs matching your profile in India & Remote.
          </p>
          <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        </div>
      </div>

      <FilterBar />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
  );
}
