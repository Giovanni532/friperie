"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserFormSchema } from "@/app/utils/formSchema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import Spinner from "@/app/components/Spinner";
import { updateData } from "@/app/db/request/updateDoc";
import { toast } from "@/components/ui/use-toast";
import { revalidateUser } from "@/app/admin/[id]/dashboard/action/action";


export default function UpdateProfil({ user }) {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(updateUserFormSchema),
        defaultValues: {
            prenom: user.username.split(" ")[0],
            nom: user.username.split(" ")[1],
            adresse: user.adresse,
            nip: user.nip.toString(),
            ville: user.ville
        },
    });

    const onFormSubmit = async (data) => {
        setLoading(true);
        const userData = {
            username: data.prenom + " " + data.nom,
            adresse: data.adresse,
            nip: data.nip,
            ville: data.ville
        };
        await updateData(user.uid, "user", userData);
        await revalidateUser(user.uid);
        setTimeout(() => {
            toast({
                title: `${userData.username}`,
                description: `Vos informations ont bien été mises à jour.`,
            });
            setLoading(false);
        }, 500);
    };

    return (
        <div className="w-7/12 mx-auto">
            {loading ?
                <Spinner message={"Modification en cours ..."} />
                :
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onFormSubmit)}>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="prenom"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Prénom</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Jean" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="nom"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Nom</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Dupont" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="nip"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Code postal</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="1214" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="ville"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ville</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Genève" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="adresse"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Votre adresse actuel</FormLabel>
                                            <FormControl>
                                                <Input placeholder="12 rue des ..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button className="w-full" type="submit">
                                Modifier mes informations
                            </Button>
                        </div>
                    </form>
                </Form>
            }
        </div>
    );
}
