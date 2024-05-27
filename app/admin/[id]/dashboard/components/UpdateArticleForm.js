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
import { articleUpdateSchema } from "@/app/utils/formSchema";
import { toast } from "@/components/ui/use-toast";
import { revalidate } from "../action/action";
import { useState, useEffect } from "react";
import Spinner from "@/app/components/Spinner";
import { updateData } from "@/app/db/request/updateDoc";


export default function UpdateArticleForm({ article }) {
    const [loading, setLoading] = useState(false);
    const {
        register, handleSubmit, setValue, reset, formState: { errors },
    } = useForm({
        resolver: zodResolver(articleUpdateSchema),
    });

    useEffect(() => {
        // Pré-remplir les valeurs du formulaire avec les valeurs de l'article
        setValue("nomArticle", article.nomArticle);
        setValue("categorie", article.categorie);
        setValue("sousCategorie", article.sousCategorie);
        setValue("couleur", article.couleur);
        setValue("etat", article.etat);
        setValue("marque", article.marque);
        setValue("prix", article.prix);
        setValue("statut", article.statut);
        setValue("taille", article.taille);
    }, [article, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);

        await updateData(article.idArticle.toString(), "article", data);

        revalidate();

        toast({
            variant: "success",
            title: data.nomArticle,
            description: `Votre article ${data.nomArticle} a bien été modifié`,
        });

        reset();
        setLoading(false);
    };

    if (loading) {
        return <Spinner message="Modification de votre article en cours ..." />
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
                            <SelectItem value="Accessoires">Accessoires</SelectItem>
                            <SelectItem value="Sacs">Sacs</SelectItem>
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
                            <SelectItem value=" ">Aucune</SelectItem>
                            <SelectItem value="T-shirts">T-shirts</SelectItem>
                            <SelectItem value="Chemises">Chemises</SelectItem>
                            <SelectItem value="Pulls">Pulls</SelectItem>
                            <SelectItem value="Vestes">Vestes</SelectItem>
                            <SelectItem value="Pantalons">Pantalons</SelectItem>
                            <SelectItem value="Shorts">Shorts</SelectItem>
                            <SelectItem value="Jupes">Jupes</SelectItem>
                            <SelectItem value="Talons">Talons</SelectItem>
                            <SelectItem value="Baskets">Baskets</SelectItem>
                            <SelectItem value="Accessoires de cheveux">Accessoires de cheveux</SelectItem>
                            <SelectItem value="Chapeaux">Chapeaux</SelectItem>
                            <SelectItem value="Écharpes">Écharpes</SelectItem>
                            <SelectItem value="Lunettes de soleil">Lunettes de soleil</SelectItem>
                            <SelectItem value="Bijoux">Bijoux</SelectItem>
                            <SelectItem value="Sacs à main">Sacs à main</SelectItem>
                            <SelectItem value="Colliers">Colliers</SelectItem>
                            <SelectItem value="Bracelets">Bracelets</SelectItem>
                            <SelectItem value="Boucles d'oreilles">Boucles d'oreilles</SelectItem>
                            <SelectItem value="Bagues">Bagues</SelectItem>
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
                            <SelectItem value="#FF0000">Rouge</SelectItem>
                            <SelectItem value="#FFA500">Orange</SelectItem>
                            <SelectItem value="#FFFF00">Jaune</SelectItem>
                            <SelectItem value="#008000">Vert</SelectItem>
                            <SelectItem value="#0000FF">Bleu</SelectItem>
                            <SelectItem value="#4B0082">Indigo</SelectItem>
                            <SelectItem value="#9400D3">Violet</SelectItem>
                            <SelectItem value="#FFC0CB">Rose</SelectItem>
                            <SelectItem value="#000000">Noir</SelectItem>
                            <SelectItem value="#FFFFFF">Blanc</SelectItem>
                            <SelectItem value="#808080">Gris</SelectItem>
                            <SelectItem value="#A52A2A">Brun</SelectItem>
                            <SelectItem value="#D3D3D3">Argent</SelectItem>
                            <SelectItem value="#C0C0C0">Or</SelectItem>
                            <SelectItem value="#800080">Pourpre</SelectItem>
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
            <DialogFooter>
                <Button type="submit">Modifier l'article</Button>
            </DialogFooter>
        </form>
    );
}
