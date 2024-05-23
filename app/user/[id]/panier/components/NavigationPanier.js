"use client"

import { useAuthContext } from "@/app/providers/AuthProvider";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrValidate } from "react-icons/gr";

export default function NavigationPanier() {

    const { user } = useAuthContext();
    const pathname = usePathname();

    const isCurrentPath = (path) => pathname === path;
    const isNextPath = (path) => pathname.startsWith(path);

    return (
        <div className="flex flex-col items-center justify-center my-10">
            <Breadcrumb className="mx-auto pt-20 text-center">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Link
                            href={`/user/${user.uid}/panier`}
                            className={isCurrentPath(`/user/${user.uid}/panier`) ? "text-black" : isNextPath(`/user/${user.uid}/panier`) ? "text-green-500" : ""}
                        >
                            Mon panier
                        </Link>
                        {isCurrentPath(`/user/${user.uid}/panier`) ?
                            null : isNextPath(`/user/${user.uid}/panier`) ?
                                <GrValidate className="text-green-500" />
                                :
                                ""
                        }
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <Link
                            href={`/user/${user.uid}/panier/livraison`}
                            className={isCurrentPath(`/user/${user.uid}/panier/livraison`) ? "text-black" : isNextPath(`/user/${user.uid}/panier/livraison`) ? "text-green-500" : ""}
                        >
                            Adresse de livraison
                        </Link>
                        {isCurrentPath(`/user/${user.uid}/panier/livraison`) ?
                            null : isNextPath(`/user/${user.uid}/panier/livraison`) ?
                                <GrValidate className="text-green-500" />
                                :
                                ""
                        }
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <Link
                            href={`/user/${user.uid}/panier/livraison/payments`}
                            className={isCurrentPath(`/user/${user.uid}/panier/livraison/payments`) ? "text-black" : isNextPath(`/user/${user.uid}/panier/livraison/payments`) ? "text-green-500" : ""}
                        >
                            Paiements
                        </Link>
                        {isCurrentPath(`/user/${user.uid}/panier/livraison/payments`) ?
                            null : isNextPath(`/user/${user.uid}/panier/livraison/payments`) ?
                                <GrValidate className="text-green-500" />
                                :
                                ""
                        }
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <p
                            className={isCurrentPath(`/user/${user.uid}/panier/livraison/payments/success`) ? "text-green-500" : ""}
                        >
                            Commande
                        </p>
                        {isCurrentPath(`/user/${user.uid}/panier/livraison/payments/success`) ?
                            <GrValidate className="text-green-500" />
                            :
                            ""
                        }
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}
