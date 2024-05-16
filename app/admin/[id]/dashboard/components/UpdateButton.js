import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogContent, Dialog } from "@/components/ui/dialog"
import { updateArticle } from '@/app/db/request/updateDoc';
import { GrDocumentUpdate } from "react-icons/gr";


const UpdateButton = ({ article }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateArticle(article.idArticle, formData);
        closeModal();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <GrDocumentUpdate className="w-4 h-4" style={{ color: "blue" }} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Modifier l'article ...</DialogTitle>
                    <DialogDescription>
                        ......
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 h-1/2">
                </div>
            </DialogContent>
        </Dialog>
    )
};

export default UpdateButton;
