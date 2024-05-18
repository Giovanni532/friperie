import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "@/app/utils/formSchema";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import getFormattedDate from "@/app/utils/(client)/getFormatedData";
import { setCookie } from "cookies-next";
import { loginWithGoogle } from "@/app/db/auth/loginWithGoogle";
import Spinner from "@/app/components/Spinner";
import login from "@/app/db/auth/login";
import { IsAdmin } from "@/app/utils/(server)/isAdmin";

export default function LoginForm({ change }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)

    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            prenom: "",
            nom: "",
            email: "",
            password: ""
        },
    });

    const onFormSubmit = async (data) => {
        setLoading(true)
        const { result, error } = await login(data.email, data.password);
        if (error) {
            setError(true)
            setLoading(false)
          }
          const user = result.user;
          const admin = await IsAdmin(user.email)

          setCookie('admin', admin)
          setCookie('user', true)

          return router.push(`/user/${user.uid}/profile`);
    };

    const googleSubmit = async () => {
        setLoading(true);
        const now = new Date();
        const today = new Date(now.getDay());
        await loginWithGoogle(today, getFormattedDate())
            .then((result) => {
                setCookie("admin", false)
                setCookie("user", true)
                return router.push(`/user/${result}/profile`);
            })
    }

    return (
        <div className="mx-auto max-w-md space-y-8 border rounded-lg p-8">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Connexion</h1>
                <p className="text-gray-500 dark:text-gray-400">Entrez vos identifiants pour vous connecter.</p>
            </div>
            {loading ?
                <Spinner message={"Connexion en cours ..."} />
                :
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onFormSubmit)}>
                        <div className="space-y-4">
                            <div className="space-y-2">
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
                            </div>
                            <div className="space-y-2">
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
                            </div>
                            <Button className="w-full" type="submit">
                                Se connecter
                            </Button>
                            <Button className="w-full" variant="outline" onClick={googleSubmit}>
                                <FcGoogle className="h-5 w-5 mr-2" />
                                Se connecter avec Google
                            </Button>
                        </div>
                        <Separator className="my-3" />
                        <div className="text-center text-sm">
                            Pas de compte ? {" "}
                            <Link className="underline" href="#" onClick={change}>
                                S'inscrire
                            </Link>
                        </div>
                    </form>
                </Form>
            }
        </div>
    )
}