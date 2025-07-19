import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import {
  DrawerContent,
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { authClient } from "@/lib/auth-client";
import { ChevronRight, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { GeneratedAvatar } from "@/components/generated-avatar";

export const DashboardUserButton = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  const { data, isPending } = authClient.useSession();
  // console.log(authClient.useSession());

  if (isPending || !data?.user) return null;

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/sign-in"),
      },
    });
  };

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="rounded-lg border border-border/10 bg-white/5 hover:bg-white/10 flex justify-between items-center p-3 overflow-hidden">
          {data.user.image ? (
            <Avatar className="mr-3">
              <AvatarImage src={data.user.image} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={data.user.name}
              variant="initials"
              className="size-9 mr-3"
            />
          )}
          <div className="flex flex-col gap-0.5 text-left min-w-0 flex-1">
            <p className="text-sm truncate w-full">{data.user.name}</p>
            <p className="text-xs truncate w-full">{data.user.email}</p>
          </div>
          <ChevronRight className="size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerTitle>{data.user.email}</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant={"outline"} className="cursor-pointer justify-between">
              Billing
              <CreditCardIcon className="size-4" />
            </Button>
            <Button
              className="cursor-pointer justify-between"
              onClick={onLogout}
              variant={"outline"} 
            >
              Logout
              <LogOutIcon className="size-4" />
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 bg-white/5 hover:bg-white/10 flex justify-between items-center p-3 overflow-hidden">
        {data.user.image ? (
          <Avatar className="mr-3">
            <AvatarImage src={data.user.image} />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data.user.name}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left min-w-0 flex-1">
          <p className="text-sm truncate w-full">{data.user.name}</p>
          <p className="text-xs truncate w-full">{data.user.email}</p>
        </div>
        <ChevronRight className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{data.user.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">
              {data.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer justify-between">
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer justify-between"
          onClick={onLogout}
        >
          Logout
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
