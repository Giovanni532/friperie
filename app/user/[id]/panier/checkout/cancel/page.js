// app/cancel/page.js
"use client";

import Link from 'next/link';

export default function Cancel() {
  return (
    <div className="container mx-auto text-center py-20">
      <h1 className="text-3xl font-bold mb-5">Payment Canceled</h1>
      <p className="mb-5">You have canceled the payment. If this was a mistake, you can try again.</p>
      <Link href="/">
        Return to Home
      </Link>
    </div>
  );
}
