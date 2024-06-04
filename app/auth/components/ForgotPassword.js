import React, { useState } from 'react'
import { auth } from '@/app/db/config'
import { sendPasswordResetEmail } from 'firebase/auth'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const sendEmail = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Un email de réinitialisation a été envoyé.');
            setError('');
        } catch (err) {
            setError('Erreur lors de l\'envoi de l\'email de réinitialisation.');
            setMessage('');
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="text-center">
                    <Button variant="outline" className="border-0">Mot de passe oublié ?</Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Réinitialiser le mot de passe</DialogTitle>
                    <DialogDescription>Entrez votre adresse e-mail pour réinitialiser votre mot de passe.</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col">
                    <Label htmlFor="emailForgot" className="py-4">
                        Adresse e-mail
                    </Label>
                    <Input id="emailForgot" type="email" onChange={(e) => setEmail(e.target.value)} />
                    {message && <p>{message}</p>}
                    {error && <p>{error}</p>}
                </div>
                <DialogFooter>
                    <Button onClick={sendEmail}>Envoyer</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
