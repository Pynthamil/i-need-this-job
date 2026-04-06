import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getProfileAction, updateProfileAction } from "@/app/actions/profile";
import { User, Link as LinkIcon, Briefcase, Globe, FileText, Layout } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Profile | EarlyBird Jobs",
  description: "Manage your resume, career links, and job preferences.",
};

export default async function ProfilePage() {
  const user = await getProfileAction();

  if (!user) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold">Failed to load profile.</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Your Career Profile</h1>
        <p className="text-muted-foreground text-lg">
          Complete your profile to enable one-click applications and personalized job matches.
        </p>
      </div>

      <form action={updateProfileAction} className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="md:col-span-1 shadow-sm border-neutral-200">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Personal Info</CardTitle>
            </div>
            <CardDescription>How companies will see your name and contact info.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input name="name" defaultValue={user.name || ""} placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Registered Email</label>
              <Input value={user.email} disabled className="bg-muted/50 cursor-not-allowed opacity-70" />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 shadow-sm border-neutral-200">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <LinkIcon className="h-5 w-5 text-primary" />
              <CardTitle>Professional Links</CardTitle>
            </div>
            <CardDescription>Links to your work and professional presence.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Layout className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input name="github" defaultValue={user.github_url || ""} placeholder="https://github.com/username" className="pl-9" />
            </div>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input name="linkedin" defaultValue={user.linkedin_url || ""} placeholder="https://linkedin.com/in/username" className="pl-9" />
            </div>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input name="portfolio" defaultValue={user.portfolio_url || ""} placeholder="https://yourportfolio.com" className="pl-9" />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-full shadow-sm border-neutral-200">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="h-5 w-5 text-primary" />
              <CardTitle>Career Data</CardTitle>
            </div>
            <CardDescription>Add the assets you&apos;ll use for applying to new roles.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" /> Resume URL
              </label>
              <Input name="resume" defaultValue={user.resume_url || ""} placeholder="https://link-to-your-resume.pdf" />
              <p className="text-xs text-muted-foreground">Upload your resume to Drive/Cloud and paste the shareable link here.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Job Preferences & Tags</label>
              <Input name="preferences" defaultValue={user.preferences || ""} placeholder="Frontend, React, Next.js, Remote, India" />
              <p className="text-xs text-muted-foreground">Separate your skills and preferences with commas.</p>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-full flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" type="button">Cancel</Button>
          <Button type="submit">Save Profile Changes</Button>
        </div>
      </form>
    </div>
  );
}
