import { useIsMobile } from "@/hooks/use-mobile";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerContent,
} from "@/components/ui/drawer";

interface ResponsiveDialougeProps {
  title: string;
  description: string;
  children: React.ReactNode;
  open: boolean;
  openChange: (open: boolean) => void;
}

export const ResponsiveDialouge = ({
  title,
  description,
  children,
  open,
  openChange,
}: ResponsiveDialougeProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={openChange}>
        <DrawerContent >
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
            <div className="p-4">{children}</div>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={openChange}>
      <DialogHeader>
        <DialogContent>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          {children}
        </DialogContent>
      </DialogHeader>
    </Dialog>
  );
};
