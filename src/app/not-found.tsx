import { Button } from "@/components/ui/button";
import { Search, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="h-24 w-24 rounded-full bg-primary/5 flex items-center justify-center text-primary relative">
        <Search className="h-12 w-12" />
        <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          404
        </span>
      </div>
      
      <div className="space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Page not found</h1>
        <p className="text-muted-foreground max-w-[500px] text-lg">
          We couldn&apos;t find the page you were looking for. 
          The job link may have expired or was moved.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full max-w-sm">
        <Button size="lg" className="w-full sm:w-auto" variant="default" render={<Link href="/" />}>
          <Home className="mr-2 h-4 w-4" /> Go Home
        </Button>
        <Button size="lg" className="w-full sm:w-auto" variant="outline" render={<Link href="/dashboard" />}>
           Browse Jobs
        </Button>
      </div>

      <div className="pt-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer group">
         <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
         <span>Back to previous page</span>
      </div>
    </div>
  );
}
