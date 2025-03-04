'use client'
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import React from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#FFF4E1] py-4 px-6">
      <div className="flex justify-between items-center">
        <Link className="text-2xl font-bold text-[#D92552]" href="/">
          <Image
            src="/logo-32px.png"
            alt="JusticeWatch"
            width={251}
            height={32}
          />
        </Link>
        
        {/* Hamburger menu button - visible on medium and smaller screens */}
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop menu - hidden on medium and smaller screens */}
        <div className="hidden md:flex space-x-6">
          <Link className="text-black font-medium" href="/department">AGENCIES</Link>
          <Link className="text-black font-medium" href="/violence">INCIDENTS</Link>
          <Link className="text-black font-medium" href="/legislation">LEGISLATION</Link>
          <Link className="text-black font-medium" href="/about">ABOUT US</Link>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden pt-4 space-y-4">
          <Link className="block text-black font-medium" href="/department">AGENCIES</Link>
          <Link className="block text-black font-medium" href="/violence">INCIDENTS</Link>
          <Link className="block text-black font-medium" href="/legislation">LEGISLATION</Link>
          <Link className="block text-black font-medium" href="/about">ABOUT US</Link>
        </div>
      )}
    </div>
  );
}