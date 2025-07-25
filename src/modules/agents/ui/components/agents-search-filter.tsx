import { Input } from "@/components/ui/input";
import { useAgentsFilter } from "../../hooks/use-agents-filters"
import { SearchIcon } from "lucide-react";

export const AgentsSearchFilter = () => {
    const [filters, setFilters] = useAgentsFilter();
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
