import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"

export function CommandeData({ commandes }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Numero de commande</TableHead>
                    <TableHead>Adresse de livraison</TableHead>
                    <TableHead>Suivie</TableHead>
                    <TableHead>Prix</TableHead>
                    <TableHead className="text-right">Détails</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {commandes.map((commande) => (
                    <TableRow key={commande.idCommande}>
                        <TableCell className="font-medium">{`#${commande.idCommande}`}</TableCell>
                        <TableCell>{`${commande.adresse}, ${commande.nip}, ${commande.ville}`}</TableCell>
                        <TableCell>{commande.statutCommande}</TableCell>
                        <TableCell>{`${commande.prixCommande} CHF`}</TableCell>
                        <TableCell className="text-right">
                            <Link href="#">
                                Voir plus
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
