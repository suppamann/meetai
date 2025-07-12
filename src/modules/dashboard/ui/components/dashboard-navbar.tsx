"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";
import { useEffect, useState } from "react";

export const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar(); //layout is wrapped in SidebarProvider, it gives these states

  const  [commandOpen, setCommandOpen] = useState(false);

  useEffect(()=>{
    const keyDown = (e: KeyboardEvent) =>{
      if(e.key==="k" && (e.metaKey  || e.ctrlKey)){
        e.preventDefault(); //opens up chrome searchbar etc 
        setCommandOpen(open=> !open)
      }
    } 
    document.addEventListener("keydown", keyDown);

    return () => document.removeEventListener("keydown",keyDown); //clean up function
  },[]);


  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex items-center py-3 gap-x-2 border-b bg-background">
        <Button variant={"outline"} className="size-9" onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-5" />
          ) : (
            <PanelLeftCloseIcon className="size-5" />
          )}
        </Button>
        <Button
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          variant="outline"
          size="sm"
          onClick={() => setCommandOpen((open) => !open)}
        >
          <SearchIcon className="size-5" />
          Search
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono font-medium text-muted-foreground">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
};
