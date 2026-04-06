import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";

export function FilterBar() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 rounded-xl border bg-card/40 backdrop-blur-sm">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search by role, tech stack, or company..." 
          className="pl-9 h-10 bg-transparent border-none shadow-none focus-visible:ring-1"
        />
      </div>
      <div className="flex gap-2 items-center sm:border-l sm:pl-4 pl-0">
        <Button variant="outline" size="sm" className="h-9">
          Frontend
        </Button>
        <Button variant="outline" size="sm" className="h-9">
          Remote
        </Button>
        <Button variant="outline" size="sm" className="h-9">
          Intern
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 ml-auto sm:ml-2">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
