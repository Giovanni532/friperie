import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { articleSchema } from "@/app/utils/formSchema";
import getMultipleData from "@/app/db/request/getMultipleData";
import addDataWithId from "@/app/db/request/addDataWithId";
import { toast } from "@/components/ui/use-toast";
import { addArticle, revalidate } from "../action/action";

export default function FormArticle() {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
        resolver: zodResolver(articleSchema),
    });

    const onSubmit = async (data) => {
        const lastArticle = (await getMultipleData("article")).resultGetMultipleData.slice(-1);

        console.log(lastArticle[0].idArticle)

        await  addArticle(lastArticle[0].idArticle, data)

        revalidate();

        toast({
            title: data.nomArticle,
            description: `Votre article ${data.nomArticle} à bien été ajouter`,
        });

        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="nomArticle">Nom de l'article</Label>
                <Input id="nomArticle" placeholder="Entrez le nom de l'article" {...register("nomArticle")} />
                {errors.nomArticle && <span className="text-red-500">{errors.nomArticle.message}</span>}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="categorie">Catégorie</Label>
                    <Select id="categorie" onValueChange={(value) => setValue("categorie", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Haut">Haut</SelectItem>
                            <SelectItem value="Bas">Bas</SelectItem>
                            <SelectItem value="Chaussure">Chaussure</SelectItem>
                            <SelectItem value="Autre">Autre</SelectItem>
                        </SelectContent>
                    </Select>
                    <input type="hidden" {...register("categorie")} />
                    {errors.categorie && <span className="text-red-500">{errors.categorie.message}</span>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="sousCategorie">Sous-catégorie</Label>
                    <Select id="sousCategorie" onValueChange={(value) => setValue("sousCategorie", value)}>
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
                    {errors.sousCategorie && <span className="text-red-500">{errors.sousCategorie.message}</span>}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="couleur">Couleur</Label>
                    <Select id="couleur" onValueChange={(value) => setValue("couleur", value)}>
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
                    {errors.couleur && <span className="text-red-500">{errors.couleur.message}</span>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="etat">Etat</Label>
                    <Select id="etat" onValueChange={(value) => setValue("etat", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez l'état" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Neuf">Neuf</SelectItem>
                            <SelectItem value="Bonne état">Bonne état</SelectItem>
                        </SelectContent>
                    </Select>
                    <input type="hidden" {...register("etat")} />
                    {errors.etat && <span className="text-red-500">{errors.etat.message}</span>}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="marque">Marque</Label>
                    <Input id="marque" placeholder="Entrez la marque" {...register("marque")} />
                    {errors.marque && <span className="text-red-500">{errors.marque.message}</span>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="prix">Prix</Label>
                    <Input id="prix" placeholder="Entrez le prix" type="number" {...register("prix")} />
                    {errors.prix && <span className="text-red-500">{errors.prix.message}</span>}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="statut">Statut</Label>
                    <Select id="statut" onValueChange={(value) => setValue("statut", value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez le statut" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="En vente">En vente</SelectItem>
                            <SelectItem value="Réserver">Réserver</SelectItem>
                        </SelectContent>
                    </Select>
                    <input type="hidden" {...register("statut")} />
                    {errors.statut && <span className="text-red-500">{errors.statut.message}</span>}
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="taille">Taille</Label>
                    <Select id="taille" onValueChange={(value) => setValue("taille", value)}>
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
                    {errors.taille && <span className="text-red-500">{errors.taille.message}</span>}
                </div>
            </div>
            <div className="grid gap-4">
                <Label htmlFor="images">Images</Label>
                <Input id="images" multiple type="file" />
            </div>
            <DialogFooter>
                <Button type="submit">Enregistrer</Button>
            </DialogFooter>
        </form>
    );
}
