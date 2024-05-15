import React, { useState } from "react";
import signup from "@/app/db/auth/signup";
import addDataWithId from "@/app/db/request/addDataWithId";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { setCookie } from "cookies-next";

const formSchema = z.object({
  prenom: z.string().min(3, {
    message: "Entrer votre prenom.",
  }),
  nom: z.string().min(3, {
    message: "Entre votre nom.",
  }),
  email: z.string().email({
    message: "Email invalide, veuillez entrer un mail valide.",
  }),
  password: z.string().min(8, {
    message: "Votre mot de passe doit contenir au moins 8 caractères.",
  }),
  adresse: z.string().min(10, {
    message: "Adresse invalide, veuillez entrer une adresse valide."
  }),
  codePostal: z.string().min(4, {
    message: "Code postal invalide, veuillez entrer un code postal valide.",
  }),
  ville: z.string().min(2, {
    message: "Nom de la ville invalide, veuillez entrer un nom de ville valide.",
  }),
});


export default function SignupForm({ change }) {
  const [emailAlreadyExist, setEmailAlreadyExist] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prenom: "",
      nom: "",
      adresse: "",
      codePostal: "",
      ville: "",
      email: "",
      password: ""
    },
  });

  const onFormSubmit = async (data) => {
    const { prenom, nom, email, password, adresse, codePostal, ville } = data;
    const { resultSignup, errorSignup } = await signup(email, password);
    if (errorSignup) {
      setEmailAlreadyExist(true);
    } else {
      const uid = resultSignup.user.uid;
      const user = {
        prenom,
        nom,
        email,
        adresse,
        codePostal,
        ville,
        uid,
      };
      await addDataWithId("user", uid, user);

      setCookie("admin", false)
      setCookie("user", true)

      return router.push(`/user/${uid}/profile`);
    }
  };

  return (
    <>
      <div className="container mx-auto space-y-5 mt-10 p-8 shadow-2xl rounded w-2/6">
        <h2 className="text-center text-xl">S'inscrire</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="prenom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre prénom</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre nom</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adresse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre adresse</FormLabel>
                  <FormControl>
                    <Input placeholder="Avenue de ..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="codePostal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code postal</FormLabel>
                  <FormControl>
                    <Input placeholder="1201" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre email</FormLabel>
                  <FormControl>
                    <Input placeholder="exemple@gmail.com" {...field} />
                  </FormControl>
                  {emailAlreadyExist && (
                    <FormDescription className={cn("text-sm font-medium text-destructive")}>Email deja existant</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center mt-2">
              <Button type="submit">S'inscrire</Button>
            </div>
          </form>
        </Form>
        <div className="text-center">
          <Button onClick={change}>Vous avez deja un compte ?</Button>
        </div>
      </div>
    </>
  );
}
