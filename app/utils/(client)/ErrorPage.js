'use client'
import Link from "next/link"
import { Compass } from 'lucide-react';

export default function ErrorPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-8 px-4 md:px-6">
      <div className="flex max-w-md flex-col items-center justify-center gap-4 text-center">
        <Compass className="h-20 w-20 text-gray-500 dark:text-gray-400" />
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Oops, page not found!</h1>
        <p className="text-gray-500 dark:text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Don&apos;t worry, you can find plenty of other things
          on our platform.
        </p>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          href="/"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  )
}