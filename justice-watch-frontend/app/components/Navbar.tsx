import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="bg-[#FFF4E1] py-4 px-6 flex justify-between items-center">
      <Link className="text-2xl font-bold text-[#D92552]" href="/">
        <Image
          src="/logo-32px.png"
          alt="JusticeWatch"
          width={251}
          height={32}
        />
      </Link>
      <div className="space-x-6">
        <Link className="text-black font-medium" href="/department">
          AGENCIES
        </Link>
        <Link className="text-black font-medium" href="/violence">
          INCIDENTS
        </Link>
        <Link className="text-black font-medium" href="/legislation">
          LEGISLATION
        </Link>
        <Link className="text-black font-medium" href="/about">
          ABOUT
        </Link>
      </div>
    </div>
  );
}
