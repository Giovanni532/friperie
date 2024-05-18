import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema } from "@/app/utils/formSchema";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import signup from "@/app/db/auth/signup";
import getFormattedDate from "@/app/utils/(client)/getFormatedData";
import { cn } from "@/lib/utils";
import addDataWithId from "@/app/db/request/addDataWithId";
import { setCookie } from "cookies-next";
import { loginWithGoogle } from "@/app/db/auth/loginWithGoogle";
import Spinner from "@/app/components/Spinner";

export default function SignupForm({ change }) {
    const [loading, setLoading] = useState(false);
    const [emailAlreadyExist, setEmailAlreadyExist] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            prenom: "",
            nom: "",
            email: "",
            password: ""
        },
    });

    const onFormSubmit = async (data) => {
        setLoading(true)
        const now = new Date();
        const today = new Date(now.getDay());
        const { resultSignup, errorSignup } = await signup(data.email, data.password);
        if (errorSignup) {
            setEmailAlreadyExist(true);
            setLoading(false)
        }
        const uid = resultSignup.user.uid;
        const user = {
            ...data,
            username: data.prenom + " " + data.nom,
            createdAt: today,
            createdUserAt: getFormattedDate()
        };
        await addDataWithId("user", uid, user);
        router.push(`/user/${uid}/profile`);
        setCookie("admin", false)
        setCookie("user", true)
    };

    const googleSubmit = async () => {
        setLoading(true);
        const now = new Date();
        const today = new Date(now.getDay());
        await loginWithGoogle(today, getFormattedDate())
            .then((result) => {
                setCookie("admin", false)
                setCookie("user", true)
                router.push(`/user/${result}/profile`);
            })
    }

    return (
        <div className="mx-auto max-w-md space-y-8 border rounded-lg p-8">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Inscription</h1>
                <p className="text-gray-500 dark:text-gray-400">Entrez vos informations pour créer un compte</p>
            </div>
            {loading ?
                <Spinner message={"Inscription en cours ..."} />
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
                                            {emailAlreadyExist && (
                                                <FormDescription className={cn("text-sm font-medium text-destructive")}>Email deja existant</FormDescription>
                                            )}
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
                                S'inscrire
                            </Button>
                            <Button className="w-full" variant="outline" onClick={googleSubmit}>
                                <FcGoogle className="h-5 w-5 mr-2" />
                                S'inscrire avec Google
                            </Button>
                        </div>
                        <Separator className="my-3" />
                        <div className="text-center text-sm">
                            Déjà un compte ? {" "}
                            <Link className="underline" href="#" onClick={change}>
                                Se connecter
                            </Link>
                        </div>
                    </form>
                </Form>
            }
        </div>
    )
}