"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { livraisonFormSchema } from "@/app/utils/formSchema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import { useAuthContext } from "@/app/providers/AuthProvider";
import { updateData } from "@/app/db/request/updateDoc";
import getDataWithId from "@/app/db/request/getDataWithId";

export default function LivraisonForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { user, userLogged } = useAuthContext();

    const form = useForm({
        resolver: zodResolver(livraisonFormSchema),
        defaultValues: {
            nip: "",
            ville: "",
            adresse: "",
        },
    });

    const onFormSubmit = async (data) => {
        setLoading(true)
        await updateData(user.uid, "user", data)
        const res = await getDataWithId("user", user.uid)

        userLogged(res.resultGetData.data())
        router.push(`/user/${user.uid}/panier/livraison/payments`);
    };

    return (
        <div className="mx-auto max-w-md space-y-8 border rounded-lg p-8">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Votre adresse</h1>
                <p className="text-gray-500 dark:text-gray-400">Entrez votre adresse pour que l&apos;on puisse vous envoyer votre nouvelle habits !</p>
            </div>
            {loading ?
                <Spinner message={"Redirection vers la page de paiement en cours ..."} />
                :
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onFormSubmit)}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="nip"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Votre nip</FormLabel>
                                            <FormControl>
                                                <Input placeholder="1214" {...field} />
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
                                            <FormLabel>Votre ville</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Vernier" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="adresse"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Votre adresse</FormLabel>
                                            <FormControl>
                                                <Input placeholder="12 chemin des coquelicots" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button className="w-full" type="submit">
                                Acceder au payments
                            </Button>
                        </div>
                    </form>
                </Form>
            }
        </div>
    )
}