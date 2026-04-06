"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center space-y-6">
      <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
        <AlertTriangle className="h-10 w-10" />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Something went wrong</h1>
        <p className="text-muted-foreground max-w-[500px]">
          An unexpected error occurred while loading this page. 
          The job feed or database might be temporarily unavailable.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button onClick={() => reset()} variant="default" size="lg">
          <RotateCcw className="mr-2 h-4 w-4" /> Try Again
        </Button>
        <Button variant="outline" size="lg" render={<Link href="/" />}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}
