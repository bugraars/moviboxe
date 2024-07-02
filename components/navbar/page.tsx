// components/navbar/Navbar.tsx
"use client";
import React from 'react';
import Search from '@/components/search/page';
import LocaleSwitcher from '@/components/switch/page';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function Navbar() {
  const locale = Cookies.get('NEXT_LOCALE') || 'en';

  return (
    <div className="absolute z-10 top-0 left-0 right-0 mx-auto p-4 text-white flex justify-center md:justify-between items-center w-11/12">
      <Link href={`/${locale}`} legacyBehavior>
        <a>
          <img src="/images/logo.svg" alt="logo" width={192} className="mx-auto md:mx-0" />
        </a>
      </Link>
      <div className="hidden md:flex">
        <Search />
      </div>
      <div className="hidden md:flex flex-shrink-0">
        <LocaleSwitcher />
      </div>
    </div>
  );
}
