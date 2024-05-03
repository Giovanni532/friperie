import React from "react";
import login from "@/app/db/auth/login";
import { useRouter } from "next/navigation";
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

const formSchema = z.object({
  email: z.string().email({
    message: "Email invalide ou introuvable",
  }),
  password: z.string(),
});

export default function LoginForm({ change }) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = async (data) => {
    const { email, password } = data;
    const { result, error } = await login(email, password);
    if (error) {
      return console.log(error);
    }

    const uid = result.user.uid;

    return router.push(`/user/${uid}/profile`);
  };

  return (
    <>
      <div className="container mx-auto space-y-5 mt-10 p-8 shadow-2xl rounded w-2/6">
        <h2 className="text-center text-xl">Se connecter</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre email</FormLabel>
                  <FormControl>
                    <Input placeholder="exemple@gmail.com" {...field} />
                  </FormControl>
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
            <div className="text-center">
              <Button type="submit">Connexion</Button>
            </div>
          </form>
        </Form>
        <div className="text-center">
          <Button onClick={change}>Toujours pas inscrit ?</Button>
        </div>
      </div>
    </>
  );
}
