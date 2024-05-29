import "./globals.css";
import LayoutProvider from "./providers/LayoutProvider";

export const metadata = {
  title: "Friperie en ligne | Trouvez des vêtements vintage et uniques",
  description: "Découvrez une sélection de vêtements vintage et uniques dans notre friperie en ligne. Trouvez des pièces originales pour exprimer votre style et votre personnalité.",
  keywords: [
    "friperie en ligne",
    "vêtements vintage",
    "mode rétro",
    "vêtements d'occasion",
    "vêtements uniques",
    "boutique de vêtements",
  ],
  image: "/src/next.svg", // Chemin de l'image représentant la page d'accueil
  author: "Votre Nom ou Nom de la Friperie",
  url: "https://www.votrefriperieenligne.com", // Lien vers la page d'accueil de votre site
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <LayoutProvider>
        {children}
      </LayoutProvider>
    </html>
  );
}
