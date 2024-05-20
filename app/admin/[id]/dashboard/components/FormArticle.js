import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    SelectValue,
    SelectTrigger,
    SelectItem,
    SelectContent,
    Select
} from "@/components/ui/select";
import { articleSchema } from "@/app/utils/formSchema";
import { toast } from "@/components/ui/use-toast";
import { revalidate } from "../action/action";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/app/db/config";
import {getNextArticleId} from "@/app/db/utils/getNextArticleId";
import { useState } from "react";
import Spinner from "@/app/components/Spinner";
import addDataWithId from "@/app/db/request/addDataWithId";


export default function FormArticle() {
    const [loading, setLoading] = useState(false);
    const {
        register, handleSubmit, setValue, reset, formState: { errors },
    } = useForm({
        resolver: zodResolver(articleSchema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        // Recuperation de l'id de l'article
        const idArticle = await getNextArticleId();
        // Telechargement de l'image sur le storage
        const fileUploadPromises = Array.from(data.images).map(async (file) => {
            const storageRef = ref(
                storage,
                `images/article/${idArticle}/${file.name}`
            );
            const snapshot = await uploadBytesResumable(storageRef, file);
            return await getDownloadURL(snapshot.ref);
        });
        // Recuperation des urls
        const filesUrls = await Promise.all(fileUploadPromises);

        const article = { ...data, idArticle, images: filesUrls };

        await addDataWithId("article", idArticle.toString(), article);

        revalidate();


        toast({
            title: data.nomArticle,
            description: `Votre article ${data.nomArticle} à bien été ajouter`,
            variant: "success"
        });

        reset();
        setLoading(false);
    };

    if(loading){
        return <Spinner message="Ajout de votre article en cours ..."/>
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="nomArticle" name="nomArticle">Nom de l'article</Label>
                <Input
                    id="nomArticle"
                    name="nomArticle"
                    placeholder="Entrez le nom de l'article"
                    {...register("nomArticle")} />
                {errors.nomArticle && (
                    <p className="text-red-500 text-xs">{errors.nomArticle.message}</p>
                )}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="categorie">Catégorie</Label>
                    <Select
                        id="categorie"
                        name="categorie"
                        onValueChange={(value) => setValue("categorie", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Robe">Robe</SelectItem>
                            <SelectItem value="Haut">Haut</SelectItem>
                            <SelectItem value="Bas">Bas</SelectItem>
                            <SelectItem value="Chaussure">Chaussure</SelectItem>
                            <SelectItem value="Autre">Autre</SelectItem>
                        </SelectContent>
                    </Select>
                    <input type="hidden" {...register("categorie")} />
                    {errors.categorie && (
                        <p className="text-red-500 text-xs">{errors.categorie.message}</p>
                    )}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="sousCategorie">Sous-catégorie</Label>
                    <Select
                        id="sousCategorie"
                        name="sousCategorie"
                        onValueChange={(value) => setValue("sousCategorie", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une sous-catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Robe">Robe</SelectItem>
                            <SelectItem value="Débardeur">Débardeur</SelectItem>
                            <SelectItem value="T-shirt">T-shirt</SelectItem>
                            <SelectItem value="Pull">Pull</SelectItem>
                            <SelectItem value="Veste">Veste</SelectItem>
                            <SelectItem value="Pantalon">Pantalon</SelectItem>
                            <SelectItem value="Short">Short</SelectItem>
                            <SelectItem value="Jupe">Jupe</SelectItem>
                            <SelectItem value="Basket">Basket</SelectItem>
                            <SelectItem value="Talon">Talon</SelectItem>
                            <SelectItem value="Sac">Sac</SelectItem>
                        </SelectContent>
                    </Select>
                    <input type="hidden" {...register("sousCategorie")} />
                    {errors.sousCategorie && (
                        <p className="text-red-500 text-xs">{errors.sousCategorie.message}</p>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="couleur">Couleur</Label>
                    <Select
                        id="couleur"
                        name="couleur"
                        onValueChange={(value) => setValue("couleur", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une couleur" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Noir">Noir</SelectItem>
                            <SelectItem value="Blanc">Blanc</SelectItem>
                            <SelectItem value="Rouge">Rouge</SelectItem>
                            <SelectItem value="Vert">Vert</SelectItem>
                            <SelectItem value="Bleu">Bleu</SelectItem>
                            <SelectItem value="Jaune">Jaune</SelectItem>
                            <SelectItem value="Violet">Violet</SelectItem>
                            <SelectItem value="Cyan">Cyan</SelectItem>
                            <SelectItem value="#800000">Marron</SelectItem>
                            <SelectItem value="#FFA500">Orange</SelectItem>
                        </SelectContent>
                    </Select>
                    <input type="hidden" {...register("couleur")} />
                    {errors.couleur && (
                        <p className="text-red-500 text-xs">{errors.couleur.message}</p>
                    )}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="etat">Etat</Label>
                    <Select id="etat" name="etat" onValueChange={(value) => setValue("etat", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez l'état" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Neuf">Neuf</SelectItem>
                            <SelectItem value="Comme neuf">Comme neuf</SelectItem>
                            <SelectItem value="Bonne état">Bonne état</SelectItem>
                        </SelectContent>
                    </Select>
                    <input type="hidden" {...register("etat")} />
                    {errors.etat && (
                        <p className="text-red-500 text-xs">{errors.etat.message}</p>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="marque">Marque</Label>
                    <Input
                        id="marque"
                        placeholder="Entrez la marque"
                        {...register("marque")} />
                    {errors.marque && (
                        <p className="text-red-500 text-xs">{errors.marque.message}</p>
                    )}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="prix">Prix</Label>
                    <Input
                        id="prix"
                        placeholder="Entrez le prix"
                        type="number"
                        {...register("prix")} />
                    {errors.prix && (
                        <p className="text-red-500 text-xs">{errors.prix.message}</p>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="statut">Statut</Label>
                    <Select
                        id="statut"
                        name="statut"
                        onValueChange={(value) => setValue("statut", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez le statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="En vente">En vente</SelectItem>
                            <SelectItem value="Réserver">Réserver</SelectItem>
                        </SelectContent>
                    </Select>
                    <input type="hidden" {...register("statut")} />
                    {errors.statut && (
                        <p className="text-red-500 text-xs">{errors.statut.message}</p>
                    )}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="taille">Taille</Label>
                    <Select
                        id="taille"
                        name="taille"
                        onValueChange={(value) => setValue("taille", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez la taille" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="XS">XS</SelectItem>
                            <SelectItem value="S">S</SelectItem>
                            <SelectItem value="M">M</SelectItem>
                            <SelectItem value="L">L</SelectItem>
                            <SelectItem value="XL">XL</SelectItem>
                            <SelectItem value="U">U</SelectItem>
                        </SelectContent>
                    </Select>
                    <input type="hidden" {...register("taille")} />
                    {errors.taille && (
                        <p className="text-red-500 text-xs">{errors.taille.message}</p>
                    )}
                </div>
            </div>
            <div className="grid gap-4">
                <Label htmlFor="images">Images</Label>
                <Input id="images" multiple type="file" {...register("images")} />
                {errors.images && (
                    <p className="text-red-500 text-xs">{errors.images.message}</p>
                )}
            </div>
            <DialogFooter>
                <Button type="submit">Ajouter l'article</Button>
            </DialogFooter>
        </form>
    );
}
