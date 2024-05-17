import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogContent, Dialog } from "@/components/ui/dialog"
import { updateArticle } from '@/app/db/request/updateDoc';
import { GrDocumentUpdate } from "react-icons/gr";
import UpdateArticleForm from './UpdateArticleForm';


const UpdateButton = ({ article }) => {

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
                    <DialogTitle>Modifier l'article {article.nomArticle}</DialogTitle>
                    <DialogDescription>
                        Remplissez les informations ci-dessous pour modifier votre article.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 h-1/2">
                    <UpdateArticleForm article={article}/>
                </div>
            </DialogContent>
        </Dialog>
    )
};

export default UpdateButton;
