import React from 'react';
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogContent, Dialog } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import getDataWithId from '@/app/db/request/getDataWithId';
import Image from 'next/image';

export async function getArticleIds(ids) {
    const articleIds = ids.split(',').map(id => id.trim());
    const articles = await Promise.all(articleIds.map(async id => {
        const article = await getDataWithId("article", id);
        return article.resultGetData.data();
    }));
    return articles;
}

const DetailCommande = async ({ commande }) => {
    const articles = await getArticleIds(commande.idArticle);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Voir plus</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Commande numéro #{commande.idCommande}</DialogTitle>
                    <DialogDescription>
                        Voici les détails de la commande passée le {commande.date} par {commande.usernameUser}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex items-center">
                        <div className='flex flex-col'>
                        {articles.map(article => (
                            <div key={article.id} className="flex items-center my-2">
                                <Image
                                    src={article.images[0]}
                                    alt={article.nomArticle}
                                    className="w-20 h-20 mr-2 rounded"
                                    width={100}
                                    height={100}
                                    quality={100}
                                />
                                <p className="font-bold">{article.nomArticle}</p>
                            </div>
                        ))}
                        </div>
                        
                    </div>
                    <p><span className="font-bold">Adresse de livraison :</span> {commande.adresse}, {commande.nip}, {commande.ville}</p>
                    <p><span className="font-bold">Date de livraison prévue :</span> {commande.dateDeLivraison}</p>
                    <p><span className="font-bold">Email :</span> {commande.emailUser}</p>
                    <p><span className="font-bold">Prix de la commande :</span> {commande.prixCommande} CHF</p>
                    <p><span className="font-bold">Statut de la commande :</span> {commande.statutCommande}</p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DetailCommande;
