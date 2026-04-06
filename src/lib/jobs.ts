export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  tags: string[];
  postedAt: string;
  isHot?: boolean;
  url: string;
}

export async function getJobsFromIndia(): Promise<Job[]> {
  try {
    // We use Jobicy API and Arbeitnow to get a mix of tech jobs
    const res = await fetch("https://www.arbeitnow.com/api/job-board-api", { next: { revalidate: 300 } });
    const data = await res.json();
    
    // Filter jobs that are remote or explicitly in India
    const jobs = data.data
      .filter((job: any) => {
        const loc = (job.location || "").toLowerCase();
        return loc.includes("india") || loc.includes("remote") || loc.includes("anywhere") || job.remote;
      })
      .map((job: any) => {
        // Calculate relative time like "2h ago"
        const postDate = new Date(job.created_at * 1000);
        const hoursAgo = Math.floor((Date.now() - postDate.getTime()) / (1000 * 60 * 60));
        let postedAt = "";
        
        if (hoursAgo < 1) postedAt = "Just now";
        else if (hoursAgo < 24) postedAt = `${hoursAgo}h ago`;
        else postedAt = `${Math.floor(hoursAgo / 24)}d ago`;

        return {
          id: job.slug,
          title: job.title,
          company: job.company_name,
          location: job.location || "Remote",
          tags: job.tags ? job.tags.slice(0, 3) : ["tech", "remote"],
          postedAt,
          isHot: hoursAgo < 24,
          url: job.url,
        };
      });

    return jobs.slice(0, 10);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}
