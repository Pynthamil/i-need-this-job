import Link from "next/link";
import { Bird, Bell } from "lucide-react";
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
            <Link href="/profile" className="transition-colors hover:text-foreground">Profile</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/alerts" className="relative h-8 w-8 rounded-full border bg-background flex items-center justify-center hover:bg-muted transition-colors transition-all active:scale-95 group">
            <Bell className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-primary animate-pulse" />
          </Link>
          <Button variant="ghost" size="sm" className="hidden md:flex text-muted-foreground" render={<Link href="/login">Log in</Link>} nativeButton={false} />
          <Button size="sm" render={<Link href="/dashboard">Get Started</Link>} nativeButton={false} />
        </div>
      </div>
    </nav>
  );
}
