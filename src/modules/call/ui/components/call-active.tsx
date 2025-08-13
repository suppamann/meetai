import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
import Image from "next/image";
import Link from "next/link";

interface Props {
  meetingName: string;
  onLeave: () => void;
}
export const CallActive = ({ meetingName, onLeave }: Props) => {
  return (
    <div className="flex flex-col justify-between p-4 h-full text-white">
      <div className="flex rounded-full p-4 items-center gap-4 bg-[#101213]">
        <Link
          href="/"
          className="flex items-center justify-center p-1 bg-white/10 rounded-full w-fit"
        >
          <Image src="/logo.svg" alt="Logo" height={27} width={27} />
        </Link>
        <h4 className="text-base">{meetingName}</h4>
      </div>
      <SpeakerLayout/>
      <div className="bg-[#101213] rounded-full px-4">
        <CallControls onLeave={onLeave}/>
      </div>
    </div>
  );
};
