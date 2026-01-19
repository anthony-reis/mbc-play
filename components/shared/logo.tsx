import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-baseline gap-0 shrink-0">
      <span className="text-[20px] text-white md:text-[24px] font-black leading-[100%] tracking-[0%]">
        MBC
      </span>
      <span className="text-[18px] md:text-[20px] font-semibold leading-[100%] tracking-[0%] text-red-600">
        PLAY
      </span>
    </Link>
  );
}
