import Link from "next/link";
import { ArrowLeft, Building2, MapPin, Clock, CheckCircle2, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // In a real app we would fetch the job based on the id
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary">Frontend</Badge>
              <Badge variant="secondary" className="bg-green-500/10 text-green-600">Internship</Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-4">Frontend Engineer Intern (Job #{id})</h1>
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <span className="flex items-center"><Building2 className="mr-2 h-5 w-5" /> Notion</span>
              <span className="flex items-center"><MapPin className="mr-2 h-5 w-5" /> Remote, US</span>
              <span className="flex items-center"><Clock className="mr-2 h-5 w-5" /> Posted 12m ago</span>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-4 text-foreground">About the role</h3>
            <p className="text-muted-foreground mb-6">
              We are looking for a highly motivated Frontend Engineering Intern to join our core product team. You will be responsible for building highly interactive and performant web interfaces using React and Next.js.
            </p>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Requirements</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2 mb-6">
              <li>Currently pursuing a BS/MS in Computer Science or related field</li>
              <li>Experience building web applications with React</li>
              <li>Strong understanding of HTML, CSS, and modern JavaScript/TypeScript</li>
              <li>Passion for UI/UX and product excellence</li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-xl border bg-card p-6 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-lg font-semibold mb-4">Fast Apply Assistant</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Resume Match</p>
                  <p className="text-xs text-muted-foreground">85% match with your profile</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Skills aligned</p>
                  <p className="text-xs text-muted-foreground">React, Next.js, UI/UX</p>
                </div>
              </div>
            </div>

            <Button className="w-full mb-3" size="lg">
              Apply on Company Site <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            
            <Button variant="outline" className="w-full text-muted-foreground" size="lg">
              Save for later
            </Button>
            
            <div className="mt-6 pt-6 border-t">
              <Link href="/tracker" className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors group">
                Move to Application Tracker
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
