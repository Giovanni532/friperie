"use client"

import Link from "next/link";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet, SheetClose } from "@/components/ui/sheet";
import { useAuthContext } from "@/app/providers/AuthProvider";
import { getCookie } from "cookies-next";
import logout from "@/app/db/auth/logout";
import { useRouter } from "next/navigation";
import { RiMenu4Line } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useStore } from "../providers/StoreProvider";
import CardSheetArticle from "./CardSheetArticle";


export default function Navbar() {
  const router = useRouter();
  const admin = getCookie("admin");
  const { user, isAdmin, userLogged } = useAuthContext();
  const { articles } = useStore();

  const handleLogout = async () => {
    router.push('/')
    userLogged(false)
    await logout()
  }

  console.log(user)

  return (
    <>
      <header className="z-10 fixed flex h-16 w-full items-center justify-between px-4 md:px-6 bg-white">
        <Link className="flex items-center gap-2" href="/">
          <MountainIcon className="h-6 w-6" />
          <span className="font-semibold">Friperie</span>
        </Link>
        <nav className="hidden lg:flex">
          <ul className="flex items-center space-x-6">
            <li>
              <Link className="text-sm font-medium hover:underline hover:underline-offset-4" href="/articles">
                Articles
              </Link>
            </li>
            <li>
              <Link className="text-sm font-medium hover:underline hover:underline-offset-4" href="#">
                Chaussures
              </Link>
            </li>
            <li>
              <Link className="text-sm font-medium hover:underline hover:underline-offset-4" href="#">
                Sacs
              </Link>
            </li>
            <li>
              <Link className="text-sm font-medium hover:underline hover:underline-offset-4" href="#">
                Contact
              </Link>
            </li>
            {isAdmin && user || admin === "true" && user ?
              <li>
                <Link className="text-sm font-medium hover:underline hover:underline-offset-4" href={`/admin/${user.uid}/dashboard`}>
                  Dashboard
                </Link>
              </li>
              :
              null
            }
          </ul>
        </nav>
        <div className="flex items-center space-x-4 hidden lg:flex">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="relative" size="icon" variant="outline">
                <MdOutlineShoppingCart className="h-6 w-6" />
                {articles.length === 0 ? null :
                  <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full px-2 py-0.5 text-xs font-medium">
                    {articles.length}
                  </span>
                }
                <span className="sr-only">Cart</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              {articles.length === 0 ?
                <p>Votre panier est vide</p>
                :
                <div>
                  <p className="p-2">Votre panier</p>
                  {articles.map(article => <CardSheetArticle key={article.idArticle} article={article} />)}
                  <Separator className="my-4" />
                  {user ?
                    <SheetClose asChild>
                      <Link className="text-md font-medium hover:underline hover:underline-offset-4"
                        href={`/user/${user.uid}/panier`}>
                        Voir mon panier
                      </Link>
                    </SheetClose>
                    :
                    <div>
                      <p className="text-md">Pour acceder a votre panier vous devez être connecter.</p>
                      <SheetClose asChild>
                        <Link className="text-md font-medium hover:underline hover:underline-offset-4"
                          href={`/auth`}>
                          Me connecter
                        </Link>
                      </SheetClose>
                    </div>
                  }
                </div>
              }
            </SheetContent>
          </Sheet>
          {user ?
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar style={{ cursor: "pointer" }} className="h-9 w-9">
                  <AvatarImage alt="Profil utilisateur" />
                  <AvatarFallback>GS</AvatarFallback>
                  <span className="sr-only">Toggle user menu</span>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href={`/user/${user.uid}/profile`}>
                    Mon profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Déconnexion</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            :
            <Link
              className="text-sm font-medium hover:underline hover:underline-offset-4 hidden sm:block"
              href="/auth"
            >
              Connexion
            </Link>
          }
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden" size="icon" variant="outline">
              <RiMenu4Line className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-4 p-6">
              <SheetClose asChild>
                <Link
                  className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                  href="/articles"
                >
                  Articles
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                  href="#"
                >
                  Chaussures
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                  href="#"
                >
                  Sacs
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                  href="#"
                >
                  Contact
                </Link>
              </SheetClose>
              {isAdmin && user || admin === "true" && user ? (
                <SheetClose asChild>
                  <Link
                    className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href={`/admin/${user.uid}/dashboard`}
                  >
                    Dashboard
                  </Link>
                </SheetClose>
              )
                :
                null
              }
              {user ?
                <>
                  <SheetClose asChild>
                    <Link
                      className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                      href={`/user/${user.uid}/profile`}
                    >
                      Mon profil
                    </Link>
                  </SheetClose>
                  <Separator className="my-4" />
                  <SheetClose asChild>
                    <Button
                      onClick={handleLogout}
                    >
                      Deconnexion
                    </Button>
                  </SheetClose>
                </>
                :
                <SheetClose asChild>
                  <Link
                    className="flex items-center gap-2 text-lg font-medium transition-colors hover:text-gray-900 dark:hover:text-gray-50"
                    href="/auth"
                  >
                    Connexion
                  </Link>
                </SheetClose>
              }
            </nav>
          </SheetContent>
        </Sheet>
      </header>
      <div className="border-t border-gray-200 dark:border-gray-800" />
    </>
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