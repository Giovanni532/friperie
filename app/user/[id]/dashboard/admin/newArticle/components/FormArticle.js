import React from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import addData from '@/app/db/request/addData';

const formSchema = z.object({
  titre: z.string().min(1, {
    message: "Ajoutez un titre",
  }),
  prix: z.string().min(1, {
    message: "Ajoutez un prix qui est un chiffre entier",
  }),
  taille: z.string().min(1, {
    message: "Ajoutez une taille",
  }),
  etat: z.string().min(1, {
    message: "Ajoutez un état",
  }),
  marque: z.string().min(1, {
    message: "Ajoutez une marque",
  }),
  categorie: z.string().min(1, {
    message: "Ajoutez une catégorie",
  }),
  couleur: z.string().min(1, {
    message: "Ajoutez une couleur",
  })
});


export default function FormArticle() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titre: "",
      prix: "0",
      taille: "",
      etat: "",
      marque: "",
      categorie: "",
      couleur: ""
    },
  });

  const onFormSubmit = async (data) => {
    console.log(data)
    await addData(data)
  };

  return (
    <>
      <div className="container mx-auto space-y-5 mt-10 p-8 shadow-2xl rounded w-2/6">
        <h2 className="text-center text-xl">Ajouter un article</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="titre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre de l'article</FormLabel>
                  <FormControl>
                    <Input placeholder="T-shirt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prix de l'article</FormLabel>
                  <FormControl>
                    <Input placeholder="25" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taille"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Taille de l'article</FormLabel>
                  <FormControl>
                    <Input placeholder="M" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="etat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Etat de l'article</FormLabel>
                  <FormControl>
                    <Input placeholder="Bonne état" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marque"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marque de l'article</FormLabel>
                  <FormControl>
                    <Input placeholder="Zara" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categorie"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <FormControl>
                    <Input placeholder="Haut, Pull, Bas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="couleur"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Couleur de l'article</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center">
              <Button type="submit">Ajouter l'article</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
