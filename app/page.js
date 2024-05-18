import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import { IoIosRocket } from "react-icons/io";
import { LuRefreshCcw } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";

export default async function Home() {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12 md:py-24 bg-gray-100 dark:bg-gray-800">
        <div className="flex flex-col items-start justify-center space-y-4">
          <Card className="ml-5 space-y-2 p-5">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Découvrez nos produits tendance
            </h1>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                Explorez notre sélection de produits de qualité pour tous vos besoins. Livraison rapide et retours
                faciles.
              </p>
              <Button className="mt-4" size="md" variant="primary">
                Découvrir les produits
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-gray-50">
              Catégories populaires
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link className="group" href="#">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
                  <img
                    alt="Catégorie"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    height="200"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/200",
                      objectFit: "cover",
                    }}
                    width="300"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 group-hover:underline">
                      Vêtements
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Découvrez notre collection de vêtements tendance.
                    </p>
                  </div>
                </div>
              </Link>
              <Link className="group" href="#">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
                  <img
                    alt="Catégorie"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    height="200"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/200",
                      objectFit: "cover",
                    }}
                    width="300"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 group-hover:underline">
                      Accessoires
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Complétez votre look avec nos accessoires de qualité.
                    </p>
                  </div>
                </div>
              </Link>
              <Link className="group" href="#">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
                  <img
                    alt="Catégorie"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    height="200"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/200",
                      objectFit: "cover",
                    }}
                    width="300"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 group-hover:underline">
                      Beauté
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Découvrez nos produits de beauté de qualité.
                    </p>
                  </div>
                </div>
              </Link>
              <Link className="group" href="#">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden">
                  <img
                    alt="Catégorie"
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    height="200"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "300/200",
                      objectFit: "cover",
                    }}
                    width="300"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 group-hover:underline">
                      Maison
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      Décorez votre maison avec nos produits de qualité.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-start space-y-4">
              <IoIosRocket className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">Livraison rapide</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Nos produits sont livrés rapidement pour vous satisfaire.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <LuRefreshCcw className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">Retours faciles</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Vous pouvez facilement retourner vos produits si nécessaire.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <TbTruckDelivery className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">Expédition sécurisée</h3>
              <p className="text-gray-600 dark:text-gray-400">Vos commandes sont expédiées en toute sécurité.</p>
            </div>
          </div>
        </section>
    </>
  );
}