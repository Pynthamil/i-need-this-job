import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Target, Bell } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-4 text-center">
      <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-500 pb-2">
          Apply early. <br className="md:hidden" /> Get ahead.
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Stop missing out on the best roles. EarlyBird Jobs alerts you instantly when high-quality companies post new jobs, so you can be the first to apply.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button size="lg" className="rounded-full w-full sm:w-auto h-12 px-8" render={<Link href="/dashboard" />} nativeButton={false}>
            Start Applying Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full w-full sm:w-auto h-12 px-8" render={<Link href="#features" />} nativeButton={false}>
            See how it works
          </Button>
        </div>
      </div>

      <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mt-32 text-left">
        <FeatureCard 
          icon={<Bell className="h-6 w-6" />}
          title="Instant Alerts"
          description="Get notified via Email, Discord, or Telegram within 5 minutes of a job posting."
        />
        <FeatureCard 
          icon={<Target className="h-6 w-6" />}
          title="Smart Filters"
          description="Filter the noise. Only see jobs matching your tech stack, role, and experience level."
        />
        <FeatureCard 
          icon={<Zap className="h-6 w-6" />}
          title="Fast Apply"
          description="Pre-filled workflows help you submit high-quality applications in record time."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl border bg-card/50 backdrop-blur-sm transition-all hover:bg-card hover:-translate-y-1 duration-300">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
