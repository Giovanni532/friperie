import { getCookie, hasCookie } from "cookies-next";
import { cookies } from "next/headers";

export const metadata = {
    title: "Profil utilisateur",
    description: "Page de l'utilisateur",
};

export default function LayoutDashboard({ children }) {
    const user = getCookie("user", { cookies });

    if (user === undefined || user === "false") {
        return (
            <div>
                <h1>Ooppss</h1>
                <p>Il semblerait que cette page n'existe pas !</p>
            </div>
        );
    }

    return children;
}
