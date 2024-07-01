import CardWithCustomCursor from "@/components/CardWithCustomCursor";
import SmoothHover from "@/components/SmoothHover"
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div>In/Resi Hover Effect</div>
      <div className="flex flex-col items-center justify-center min-h-screen space-y-16">
        <CardWithCustomCursor />
        <SmoothHover />
      </div>
    </main>
  );
}
