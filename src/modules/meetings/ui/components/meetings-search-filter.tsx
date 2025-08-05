import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useMeetingsFilter } from "../../hooks/use-meetings-filters";

export const MeetingsSearchFilter = () => {
    const [filters, setFilters] = useMeetingsFilter();
  return (
    <div className="relative">
        <Input
        placeholder="Filter by name"
        className="h-9 bg-white w-[200px] pl-7"
        value={filters.search}
        onChange={(e)=> setFilters({search: e.target.value})}
        />
        <SearchIcon className="top-1/2 -translate-1/2 absolute left-4 size-4 text-muted-foreground" />
    </div>
  )
}
