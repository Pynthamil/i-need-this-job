import Link from "next/link";
import { Clock, MapPin, Building2, Flame } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  tags: string[];
  postedAt: string;
  isHot?: boolean;
}

export function JobCard({ id, title, company, location, tags, postedAt, isHot }: JobCardProps) {
  return (
    <Card className="group transition-all hover:border-primary/50 hover:shadow-sm overflow-hidden flex flex-col">
      <CardHeader className="pb-3 space-y-0">
        <div className="flex justify-between items-start mb-2 gap-4">
          <Link href={`/jobs/${id}`} className="font-semibold text-xl group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </Link>
          {isHot && (
            <Badge variant="destructive" className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-orange-500/20 flex-shrink-0">
              <Flame className="w-3 h-3 mr-1" /> Low Competition
            </Badge>
          )}
        </div>
        <div className="flex items-center text-sm text-muted-foreground gap-4 flex-wrap">
          <span className="flex items-center">
            <Building2 className="w-4 h-4 mr-1.5 opacity-70" />
            {company}
          </span>
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1.5 opacity-70" />
            {location}
          </span>
          <span className="flex items-center text-primary/80 font-medium">
            <Clock className="w-4 h-4 mr-1.5 opacity-70" />
            {postedAt}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-wrap gap-2 pb-4 flex-1">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="bg-secondary/50 font-medium">
            {tag}
          </Badge>
        ))}
      </CardContent>

      <CardFooter className="pt-0 justify-end gap-3 mt-auto">
        <Button variant="ghost" size="sm" render={<Link href={`/jobs/${id}`} />}>
          View Details
        </Button>
        <Button size="sm" render={<Link href={`/jobs/${id}?apply=true`} />}>
          Fast Apply
        </Button>
      </CardFooter>
    </Card>
  );
}
