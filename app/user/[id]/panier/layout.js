import  NavigationPanier from "./components/NavigationPanier";

export const metadata = {
    title: "Panier utilisateur",
    description: "Panier de l'utilisateur",
};

export default function LayoutPanier({ children }) {

    return (
        <div className="my-20 container mx-auto">
            <NavigationPanier/>
            {children}
        </div>
    );
}
