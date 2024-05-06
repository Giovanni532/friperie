import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function RightSection({ admin, user, handleLogout }) {
  return (
    <div className="flex items-center">
      {user ? (
        <div className="flex items-center">
          <Link
            href={`/user/${user.uid}/profile`}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Mon compte
          </Link>
          {admin && (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
                  <NavigationMenuContent className="flex flex-col w-[180px] gap-3 p-4 md:w-[180px] md:grid-cols-2 lg:w-[180px] ">
                    <Link
                      href={`/user/${user.uid}/dashboard/admin`}
                    >
                      Voir mes articles
                    </Link>
                    <Link
                      href={`/user/${user.uid}/dashboard/admin/newArticle`}
                    >
                      Ajoutez un article
                    </Link>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}

          <Button
            onClick={handleLogout}
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Déconnexion
          </Button>
        </div>
      ) : (
        <div className="flex items-center">
          <Link
            href="/auth"
            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Connexion
          </Link>
        </div>
      )}
    </div>
  );
}
