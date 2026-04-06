import { Briefcase, Calendar, CheckCircle, Clock, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { deleteApplicationAction, updateApplicationStatusAction } from "@/app/actions/tracker";
import { Metadata } from "next";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApplicationWithJob = any;

export const metadata: Metadata = {
  title: "Application Tracker | EarlyBird Jobs",
  description: "Track your job applications and move them through the hiring pipeline.",
};

const STAGES = [
  { id: "applied", label: "Applied", icon: <Clock className="w-4 h-4 text-orange-500" /> },
  { id: "interviewing", label: "Interviewing", icon: <Calendar className="w-4 h-4 text-blue-500" /> },
  { id: "offer", label: "Offer Received", icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
];

export default async function TrackerPage() {
  const applications = await prisma.application.findMany({
    include: {
      job: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  }) as ApplicationWithJob[];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Application Tracker</h1>
          <p className="text-muted-foreground">Monitor where you stand in the interview process.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-500">
        {STAGES.map((stage) => {
          const stageApps = applications.filter((a) => a.status === stage.id);
          
          return (
            <div key={stage.id} className="rounded-xl border bg-muted/20 p-4 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="font-semibold flex items-center gap-2">
                  {stage.icon}
                  {stage.label}
                </h2>
                <Badge variant="secondary" className="rounded-full px-2">
                  {stageApps.length}
                </Badge>
              </div>
              
              <div className="space-y-3 flex-1 overflow-y-auto">
                {stageApps.map((app) => (
                  <Card key={app.id} className="group hover:border-primary/50 transition-all shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-semibold leading-tight pr-2">{app.job.title}</div>
                        <form action={deleteApplicationAction.bind(null, app.id)}>
                          <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10" type="submit">
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </form>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <Briefcase className="w-3.5 h-3.5 mr-1.5" />
                        {app.job.company}
                      </div>

                      <div className="flex gap-2">
                        {stage.id === "applied" && (
                          <form action={updateApplicationStatusAction.bind(null, app.id, "interviewing")} className="w-full">
                            <Button variant="outline" size="sm" className="w-full text-xs h-7" type="submit">
                              Mark as Interviewing
                            </Button>
                          </form>
                        )}
                        {stage.id === "interviewing" && (
                          <form action={updateApplicationStatusAction.bind(null, app.id, "offer")} className="w-full">
                            <Button variant="outline" size="sm" className="w-full text-xs h-7 bg-primary/5 border-primary/20 text-primary" type="submit">
                              Mark as Offer
                            </Button>
                          </form>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {stageApps.length === 0 && (
                  <div className="text-center p-8 border border-dashed rounded-lg text-sm text-muted-foreground bg-background/50">
                    No applications here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
