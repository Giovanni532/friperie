"use client"

import React, { useState } from 'react';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth } from '@/app/db/config';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { changePasswordSchema } from '@/app/utils/formSchema';
import Spinner from '@/app/components/Spinner';

const UpdatePassword = () => {
    const [loading, setLoading] = useState(false);
    const [isGoogleUser, setIsGoogleUser] = useState(false);

    const form = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) throw new Error('Utilisateur non connecté');

            // Check if the user is authenticated via Google
            const googleProvider = user.providerData.some((provider) => provider.providerId === 'google.com');
            setIsGoogleUser(googleProvider);

            if (googleProvider) {
                // No current password for Google users, directly set new password
                await updatePassword(user, data.newPassword);
            } else {
                // Reauthenticate with current password and set new password
                const credential = EmailAuthProvider.credential(user.email, data.currentPassword);
                await reauthenticateWithCredential(user, credential);
                await updatePassword(user, data.newPassword);
            }

            toast({
                title: 'Succès',
                description: 'Votre mot de passe a été mis à jour.',
            });
        } catch (error) {
            console.error(error);
            toast({
                title: 'Erreur',
                description: 'Une erreur est survenue lors de la mise à jour du mot de passe.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {loading ? (
                <Spinner message="Mise à jour du mot de passe en cours..." />
            ) : (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mot de passe actuel</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Mot de passe actuel" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nouveau mot de passe</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Nouveau mot de passe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full my-4" type="submit">
                                Changer le mot de passe
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
};

export default UpdatePassword;
