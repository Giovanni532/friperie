import ErrorPage from "@/app/utils/(client)/ErrorPage";
import { getCookie, hasCookie } from "cookies-next";
import { cookies } from "next/headers";

export const metadata = {
    title: "Profil utilisateur",
    description: "Page de l'utilisateur",
};

export default function LayoutUser({ children }) {
    const user = getCookie("user", { cookies });

    if (user === undefined || user === "false") {
        return (
            <ErrorPage/>
        );
    }

    return children;
}
