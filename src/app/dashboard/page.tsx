import { JobCard } from "@/components/job-card";
import { FilterBar } from "@/components/filter-bar";

// Dummy data to show UI state
const LATEST_JOBS = [
  {
    id: "1",
    title: "Frontend Engineer Intern",
    company: "Notion",
    location: "Remote, US",
    tags: ["React", "TypeScript", "Next.js"],
    postedAt: "12m ago",
    isHot: true,
  },
  {
    id: "2",
    title: "Software Engineer, New Grad",
    company: "Vercel",
    location: "San Francisco, CA or Remote",
    tags: ["Next.js", "Node.js", "Go"],
    postedAt: "45m ago",
    isHot: true,
  },
  {
    id: "3",
    title: "Backend Engineer II",
    company: "Linear",
    location: "Remote, Global",
    tags: ["GraphQL", "PostgreSQL", "TypeScript"],
    postedAt: "2h ago",
  },
  {
    id: "4",
    title: "React Developer",
    company: "Stripe",
    location: "Seattle, WA",
    tags: ["React", "Ruby", "API"],
    postedAt: "5h ago",
  }
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Job Feed</h1>
        <p className="text-muted-foreground text-lg">
          We found {LATEST_JOBS.length} new jobs matching your profile in the last 24 hours.
        </p>
      </div>

      <FilterBar />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {LATEST_JOBS.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </div>
  );
}
