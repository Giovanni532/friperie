import React from 'react'
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8">
            <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-lg font-medium mb-4">À propos</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link className="hover:underline" href="#">
                                Notre histoire
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:underline" href="#">
                                Notre équipe
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:underline" href="#">
                                Nos valeurs
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-4">Produits</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link className="hover:underline" href="#">
                                Vêtements
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:underline" href="#">
                                Accessoires
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:underline" href="#">
                                Beauté
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:underline" href="#">
                                Maison
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-4">Aide</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link className="hover:underline" href="#">
                                FAQ
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:underline" href="#">
                                Livraison et retours
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:underline" href="#">
                                Nous contacter
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-4">Suivez-nous</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link className="hover:underline" href="#">
                                Facebook
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:underline" href="#">
                                Twitter
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:underline" href="#">
                                Instagram
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 text-center text-sm">© 2024 Acme Store. Tous droits réservés.</div>
        </footer>
    )
}
