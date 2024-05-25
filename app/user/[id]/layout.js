import ErrorPage from "@/app/utils/(client)/ErrorPage";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const metadata = {
    title: "Profil utilisateur",
    description: "Page de l'utilisateur",
};

export default function LayoutUser({ children }) {
    const user = getCookie("user", { cookies });

    if (user.length === 0 || user === "false") {
        return (
            <ErrorPage />
        );
    }

    return children;
}
