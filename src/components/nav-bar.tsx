import Link from "next/link";
import { Bird } from "lucide-react";
import { Button } from "./ui/button";

export function NavBar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Bird className="h-5 w-5" />
            <span className="hidden sm:inline-block">EarlyBird Jobs</span>
          </Link>
          <div className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/dashboard" className="transition-colors hover:text-foreground">Dashboard</Link>
            <Link href="/tracker" className="transition-colors hover:text-foreground">Tracker</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden md:flex" render={<Link href="/login">Log in</Link>} nativeButton={false} />
          <Button size="sm" render={<Link href="/dashboard">Get Started</Link>} nativeButton={false} />
        </div>
      </div>
    </nav>
  );
}
