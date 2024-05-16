import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import ErrorPage from "@/app/utils/(client)/ErrorPage";

export const metadata = {
    title: "Dashboard admin",
    description: "Page de gestion des articles",
};

export default function LayoutDashboard({ children }) {
    const admin = getCookie("admin", { cookies });

    if (admin === "false") {
        return (
            <ErrorPage/>
        );
    }

    return children;
}
