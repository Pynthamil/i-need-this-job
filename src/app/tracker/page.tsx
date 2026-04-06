import { Briefcase, Calendar, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STAGES = [
  { id: "applied", label: "Applied", icon: <Clock className="w-4 h-4 text-orange-500" /> },
  { id: "interviewing", label: "Interviewing", icon: <Calendar className="w-4 h-4 text-blue-500" /> },
  { id: "offer", label: "Offer Received", icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
];

const TRACKED_APPLICATIONS = [
  { id: 1, company: "Notion", role: "Frontend Engineer Intern", date: "Oct 24", stage: "applied" },
  { id: 2, company: "Vercel", role: "Software Engineer", date: "Oct 20", stage: "interviewing" },
  { id: 3, company: "Linear", role: "Backend Engineer II", date: "Oct 15", stage: "offer" }
];

export default function TrackerPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Application Tracker</h1>
          <p className="text-muted-foreground">Monitor where you stand in the interview process.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-500">
        {STAGES.map((stage) => (
          <div key={stage.id} className="rounded-xl border bg-muted/20 p-4">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="font-semibold flex items-center gap-2">
                {stage.icon}
                {stage.label}
              </h2>
              <Badge variant="secondary" className="rounded-full px-2">
                {TRACKED_APPLICATIONS.filter(a => a.stage === stage.id).length}
              </Badge>
            </div>
            
            <div className="space-y-3">
              {TRACKED_APPLICATIONS.filter(a => a.stage === stage.id).map(app => (
                <Card key={app.id} className="cursor-grab hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="font-semibold mb-1">{app.role}</div>
                    <div className="flex items-center text-sm text-muted-foreground justify-between">
                      <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{app.company}</span>
                      <span className="text-xs">{app.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {TRACKED_APPLICATIONS.filter(a => a.stage === stage.id).length === 0 && (
                <div className="text-center p-6 border border-dashed rounded-lg text-sm text-muted-foreground">
                  No applications
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
