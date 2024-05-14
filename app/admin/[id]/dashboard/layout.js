import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const metadata = {
    title: "Dashboard admin",
    description: "Page de gestion des articles",
};

export default function LayoutDashboard({ children }) {
    const admin = getCookie("admin", { cookies });

    if (admin === "false") {
        return (
            <div>
                <h1>Ooppss</h1>
                <p>Il semblerait que cette page n'existe pas !</p>
            </div>
        );
    }

    return children;
}
