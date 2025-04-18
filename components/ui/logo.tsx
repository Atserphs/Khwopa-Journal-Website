"use client"

import Image from "next/image"
import Link from "next/link"

export function SidebarLogo(){
  return(
  <Link
      href="/"
      className="flex gap-2 items-center pl-[10px] md:pl-[0px] grow md:grow-0"
    >
      <div className="relative w-5 aspect-square cursor-pointer">
        <Image
          src="/homepage/logo.png"
          alt="Khwopa Journal Logo"
          fill
          className="object-contain"
        />
      </div>

      <span className="text-[1.2rem] font-bold text-khwopaRed">
        KHWOPA
        <span className="text-[.8rem] md:text-[1.1rem] text-gray-800">
          .Journal
        </span>
      </span>
    </Link>
  )
}



export default function Logo() {
  return (
    <Link
      href="/"
      className="flex gap-2 items-center pl-[10px] md:pl-[0px] grow md:grow-0"
    >
      <div className="relative w-6 aspect-square cursor-pointer">
        <Image
          src="/homepage/logo.png"
          alt="Khwopa Journal Logo"
          fill
          className="object-contain"
        />
      </div>

      <span className="text-[1.2rem] md:text-[1.5rem] font-bold text-khwopaRed">
        KHWOPA
        <span className="text-[.8rem] md:text-[1.1rem] text-gray-800">
          .Journal
        </span>
      </span>
    </Link>
  )
}