"use client"

import { useAuthContext } from "@/app/providers/AuthProvider";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigationPanier() {
    const { user } = useAuthContext();
    const pathname = usePathname();
    return (
        <Breadcrumb className="mx-auto pt-20 text-center">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link href={`/user/${user.uid}/panier`} className={pathname === `/user/${user.uid}/panier` ? "active" : ""}>Mon panier</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <Link href={`/user/${user.uid}/panier/livraison`} className={pathname === `/user/${user.uid}/panier/livraison` ? "active" : ""}>Adresse de livraison</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <Link href={`/user/${user.uid}/panier/livraison/payments`} className={pathname === `/user/${user.uid}/panier/livraison/payments` ? "active" : ""}>Payments</Link>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
