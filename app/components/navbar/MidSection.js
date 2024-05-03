import React from "react";
import Link from 'next/link';


export default function MidSection() {
  return (
    <div className="hidden md:flex items-center justify-center flex-1">
      <div className="flex space-x-4">
        <Link
          href="#"
          className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Blog
        </Link>
        <Link
          href="#"
          className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
