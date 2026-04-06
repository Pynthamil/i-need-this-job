import Link from "next/link";
import { ArrowLeft, Building2, MapPin, Clock, CheckCircle2, ChevronRight, ExternalLink, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getJobBySlug } from "@/lib/jobs";
import { notFound } from "next/navigation";
import { trackJobAction } from "@/app/actions/tracker";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJobBySlug(id);
  
  if (!job) {
    return notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
          <div>
            <div className="flex items-center gap-3 mb-3">
              {job.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">{tag}</Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <span className="flex items-center"><Building2 className="mr-2 h-5 w-5" /> {job.company}</span>
              <span className="flex items-center"><MapPin className="mr-2 h-5 w-5" /> {job.location}</span>
              <span className="flex items-center text-primary/80 font-medium"><Clock className="mr-2 h-5 w-5" /> Posted {job.postedAt}</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none prose-p:text-muted-foreground prose-li:text-muted-foreground prose-h3:text-foreground">
            <h3 className="text-xl font-semibold mb-4 text-foreground border-b pb-2">Job Description</h3>
            <div 
              className="mt-4 break-words leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: job.description || "" }} 
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-xl border bg-card p-6 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-lg font-semibold mb-4">Fast Apply Assistant</h3>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Matched</p>
                  <p className="text-xs text-muted-foreground">This job matches your skill set.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Active Hub</p>
                  <p className="text-xs text-muted-foreground">Company is actively hiring.</p>
                </div>
              </div>
            </div>

            <Button className="w-full mb-3" size="lg" render={<a href={job.url} target="_blank" rel="noopener noreferrer" />} nativeButton={false}>
              Apply on Company Site <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            
            <form action={trackJobAction}>
              <input type="hidden" name="jobId" value={id} />
              <input type="hidden" name="title" value={job.title} />
              <input type="hidden" name="company" value={job.company} />
              <input type="hidden" name="location" value={job.location} />
              <input type="hidden" name="url" value={job.url} />
              <input type="hidden" name="tags" value={job.tags.join(',')} />
              <Button type="submit" variant="outline" className="w-full text-foreground group" size="lg">
                <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
                Move to Application Tracker
              </Button>
            </form>
            
            <div className="mt-6 pt-6 border-t">
              <Link href="/tracker" className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors group">
                View Tracker Dashboard
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
