
import React from 'react';
import deleteDocument from '@/app/db/request/deleteDoc';
import { Button } from '@/components/ui/button';
import { FaTrash } from "react-icons/fa";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { revalidate } from '../action/action';

const DeleteButton = ({ collectionName, documentId, nameArticle }) => {
    console.log(collectionName)
    const handleDelete = async () => {
        await deleteDocument(collectionName, documentId.toString());
        revalidate()
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <FaTrash className='w-4 h-4' style={{ color: "red" }} />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Êtes-vous sur de vouloir supprimer l'article {nameArticle}</AlertDialogTitle>
                    <AlertDialogDescription>
                        Cette action sera irréversible et vous ne pourrez pas récuperer cette article.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteButton;
