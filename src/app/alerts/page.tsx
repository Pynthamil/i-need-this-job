import { Bell, ShieldCheck, Zap, Globe, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { followCompanyAction, getFollowedCompaniesAction } from "@/app/actions/alerts";
import { getJobsFromIndia } from "@/lib/jobs";
import { JobCard } from "@/components/job-card";

const BIG_TECH = [
  { id: "google", name: "Google", icon: <Zap className="h-4 w-4 text-orange-500" /> },
  { id: "apple", name: "Apple", icon: <Star className="h-4 w-4 text-neutral-900" /> },
  { id: "microsoft", name: "Microsoft", icon: <Globe className="h-4 w-4 text-blue-500" /> },
  { id: "meta", name: "Meta", icon: <Zap className="h-4 w-4 text-blue-600" /> },
  { id: "amazon", name: "Amazon", icon: <Zap className="h-4 w-4 text-orange-400" /> },
];

export default async function AlertsPage() {
  const followed = await getFollowedCompaniesAction();
  const bigTechJobs = await getJobsFromIndia({ bigTech: true });

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 space-y-10">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Focus & Alerts</h1>
          <p className="text-muted-foreground text-lg"> Get notified the second a new role opens at your favorite companies.</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center animate-pulse">
          <Bell className="h-6 w-6 text-primary" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <Card className="shadow-sm border-neutral-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-500" /> Focus List
              </CardTitle>
              <CardDescription>Select companies to track instantly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {BIG_TECH.map((company) => (
                <form key={company.id} action={followCompanyAction.bind(null, company.name)}>
                  <Button 
                    variant={followed.includes(company.name) ? "default" : "outline"}
                    className="w-full justify-between items-center group h-10 px-3"
                    type="submit"
                  >
                    <span className="flex items-center gap-3">
                      {company.icon}
                      {company.name}
                    </span>
                    {followed.includes(company.name) ? (
                      <Badge className="bg-primary-foreground/20 text-[10px] uppercase h-4 px-1">Following</Badge>
                    ) : (
                      <span className="text-[10px] text-muted-foreground group-hover:text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity">Follow</span>
                    )}
                  </Button>
                </form>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/10 shadow-sm overflow-hidden">
            <div className="p-4 space-y-2 relative">
               <Zap className="h-8 w-8 text-primary/20 absolute top-2 right-2" />
               <h3 className="font-semibold text-primary">Pro Alerting</h3>
               <p className="text-sm text-primary/70 leading-relaxed">
                 We check Apple & Google career portals every 3 minutes. Never miss a single opening.
               </p>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight px-1">Latest Big Tech Openings</h2>
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider text-muted-foreground">Real-time Feed</Badge>
          </div>
          
          <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-right-4 duration-700">
            {bigTechJobs.length > 0 ? (
              bigTechJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))
            ) : (
              <div className="text-center py-20 border border-dashed rounded-2xl bg-muted/20">
                <p className="text-muted-foreground text-sm">Waiting for new Big Tech openings... Signals are active.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
