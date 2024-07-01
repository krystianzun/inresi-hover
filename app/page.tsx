import CardWithCustomCursor from "@/components/CardWithCustomCursor";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div>In/Resi Hover Effect</div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <CardWithCustomCursor />
      </div>
    </main>
  );
}
