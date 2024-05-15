"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { useAuthContext } from "@/app/providers/AuthProvider"

export default function NavbarAdmin() {
  const {user} = useAuthContext()
  return (
    <>
      <header className="flex h-16 w-full items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="font-semibold">Acme Inc</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden" size="icon" variant="outline">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-4 p-6">
              <Link
                className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                href="/"
              >
                Home
              </Link>
              <Link
                className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                href={`/admin/${user.uid}/dashboard`}
              >
                Creer un formulaire
              </Link>
              <Link
                className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                href={`/admin/${user.uid}/dashboard`}
              >
                Mes articles
              </Link>
              <Link
                className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                href="#"
              >
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <nav className="hidden lg:flex items-center gap-6">
          <Link className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50" href="/">
            Home
          </Link>
          <Link className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50" href={`/admin/${user.uid}/dashboard`}>
            Voir mes articles
          </Link>
          <Link className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50" href={`/admin/${user.uid}/dashboard`}>
            Ajouter un article
          </Link>
          <Link className="text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <div className="border-t border-gray-200 dark:border-gray-800" />
    </>
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}