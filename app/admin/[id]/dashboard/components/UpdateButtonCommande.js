import React from 'react';
import { Button } from "@/components/ui/button";
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogContent, Dialog } from "@/components/ui/dialog"
import { GrDocumentUpdate } from "react-icons/gr";
import UpdateCommandeForm from './UpdateCommandeForm';


const UpdateButtonCommande = ({ commande }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <GrDocumentUpdate className="w-4 h-4" style={{ color: "blue" }} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Modifier la commande {commande.idCommande}</DialogTitle>
                    <DialogDescription>
                        Remplissez les informations ci-dessous pour modifier votre commande.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 h-1/2">
                    <UpdateCommandeForm commande={commande}/>
                </div>
            </DialogContent>
        </Dialog>
    )
};

export default UpdateButtonCommande;