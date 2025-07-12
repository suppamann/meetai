import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {botttsNeutral,initials} from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

interface GeneratedAvatarProps {
  className?: string;
  seed: string;
  variant: "botttsNeutral" | "initials";
  //   variant: string;
}

export const GeneratedAvatar = ({
  seed,
  className,
  variant,
}: GeneratedAvatarProps) => {
  let avatar;

  if (variant === "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, {
      seed,
    });
  } else {
    avatar = createAvatar(initials, {
      seed,
      fontWeight: 500,
      fontSize: 45,
    });
  }
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} alt="avatar" />
       <AvatarFallback /> 
       {/* no need  -->  as by default "initials" gives two characters
        <AvatarFallback  seed.charAt(0).toUppercase()/> 
        */}
    </Avatar>
  );
};
