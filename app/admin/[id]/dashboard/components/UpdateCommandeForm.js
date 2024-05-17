import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { commandeSchema } from "@/app/utils/formSchema";
import { toast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import Spinner from "@/app/components/Spinner";
import { updateData } from "@/app/db/request/updateDoc";
import { revalidate } from "../action/action";

export default function UpdateCommandeForm({ commande }) {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: zodResolver(commandeSchema),
    });

    useEffect(() => {
        if (commande) {
            setValue("statut", commande.statut);
        }
    }, [commande, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        
        await updateData(commande.idCommande.toString(), "commande", { statutCommande: data.statut });

        toast({
            title: "Commande mise à jour",
            description: `Le statut de la commande ${commande.idCommande} a été mis à jour en ${data.statut}`,
        });

        revalidate();

        reset();
        setLoading(false);
    };

    if (loading) {
        return <Spinner message="Mise à jour de la commande en cours..." />
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="statut">Statut</Label>
                <Select id="statut" name="statut" onValueChange={(value) => setValue("statut", value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez le statut" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="En traitement">En traitement</SelectItem>
                        <SelectItem value="Expédiée">Expédiée</SelectItem>
                        <SelectItem value="Livrée">Livrée</SelectItem>
                        <SelectItem value="Annulée">Annulée</SelectItem>
                    </SelectContent>
                </Select>
                <input type="hidden" {...register("statut")} />
                {errors.statut && (
                    <p className="text-red-500 text-xs">{errors.statut.message}</p>
                )}
            </div>
            <DialogFooter>
                <Button type="submit">Mettre à jour la commande</Button>
            </DialogFooter>
        </form>
    );
}
