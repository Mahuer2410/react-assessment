import Image from "next/image";
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen" >
      <div className="flex flex-col gap-16 row-start-2 items-center">
        {/* Logo */}
        <Image
          src="/logos/auxo.svg" alt="Auxo logo" width={400} height={400}/>

        {/* Button */}
        <Link 
        href="/Itineraries" 
        className="py-2 px-8 rounded-[8px] bg-[#99f6e4] text-[#01C2D2] 
        hover:bg-[#22D3EE] hover:text-[#DDF0F2]">
          Start
        </Link>
      </div>
    </div>
  );
}
