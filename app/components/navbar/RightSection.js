import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IsAdmin } from "@/app/utils/(server)/isAdmin";

export default function RightSection({ user, handleLogout }) {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      IsAdmin(user.email).then((result) => {
        setAdmin(result);
      });
    }
  }, [user]);

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
            <Link
              href={`/user/${user.uid}/dashboard/admin`}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
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
