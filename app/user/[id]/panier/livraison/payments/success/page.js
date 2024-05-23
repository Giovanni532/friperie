// app/success/page.js
"use client";

import Link from 'next/link';

export default function Success() {
  return (
    <div className="container mx-auto text-center py-20">
      <h1 className="text-3xl font-bold mb-5">Payment Successful!</h1>
      <p className="mb-5">Thank you for your purchase. Your transaction was successful.</p>
      <Link href="/">
        Return to Home
      </Link>
    </div>
  );
}
