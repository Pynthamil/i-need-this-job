export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  tags: string[];
  postedAt: string;
  isHot?: boolean;
  url: string;
  description?: string;
}

function calculateRelativeTime(timestamp: number): string {
  const hoursAgo = Math.floor((Date.now() - timestamp * 1000) / (1000 * 60 * 60));
  if (hoursAgo < 1) return "Just now";
  if (hoursAgo < 24) return `${hoursAgo}h ago`;
  return `${Math.floor(hoursAgo / 24)}d ago`;
}

export async function getJobsFromIndia(filters?: { company?: string, bigTech?: boolean }): Promise<Job[]> {
  try {
    const res = await fetch("https://www.arbeitnow.com/api/job-board-api", { next: { revalidate: 300 } });
    const data = await res.json();
    
    let jobs = data.data.filter((job: any) => {
      const loc = (job.location || "").toLowerCase();
      const isRemoteOrIndia = loc.includes("india") || loc.includes("remote") || loc.includes("anywhere") || job.remote;
      
      if (filters?.company) {
        return isRemoteOrIndia && job.company_name.toLowerCase().includes(filters.company.toLowerCase());
      }
      
      if (filters?.bigTech) {
        const bigTechList = ["google", "apple", "amazon", "meta", "microsoft", "netflix"];
        return isRemoteOrIndia && bigTechList.some(bt => job.company_name.toLowerCase().includes(bt));
      }

      return isRemoteOrIndia;
    });

    return jobs.map((job: any) => ({
      id: job.slug,
      title: job.title,
      company: job.company_name,
      location: job.location || "Remote",
      tags: job.tags ? job.tags.slice(0, 3) : ["tech", "remote"],
      postedAt: calculateRelativeTime(job.created_at),
      isHot: Math.floor((Date.now() - job.created_at * 1000) / (1000 * 60 * 60)) < 24,
      url: job.url,
    })).slice(0, 10);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  try {
    const res = await fetch("https://www.arbeitnow.com/api/job-board-api", { next: { revalidate: 300 } });
    const data = await res.json();
    
    const job = data.data.find((j: any) => j.slug === slug);
    if (!job) return null;

    return {
      id: job.slug,
      title: job.title,
      company: job.company_name,
      location: job.location || "Remote",
      tags: job.tags ? job.tags.slice(0, 3) : ["tech", "remote"],
      postedAt: calculateRelativeTime(job.created_at),
      url: job.url,
      description: job.description,
    };
  } catch (error) {
    console.error("Error fetching job by slug:", error);
    return null;
  }
}
