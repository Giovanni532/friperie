"use client"

import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"

export default function ModalArticle() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ajouter un nouvel article</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouvel article</DialogTitle>
          <DialogDescription>
            Remplissez les informations ci-dessous pour ajouter un nouvel article à votre inventaire.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="nomArticle">Nom de l'article</Label>
              <Input id="nomArticle" placeholder="Entrez le nom de l'article" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="categorie">Catégorie</Label>
                <Select id="categorie">
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
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sousCategorie">Sous-catégorie</Label>
                <Select id="sousCategorie">
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
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="couleur">Couleur</Label>
                <Select id="couleur">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une couleur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="#000000">Noir</SelectItem>
                    <SelectItem value="#FFFFFF">Blanc</SelectItem>
                    <SelectItem value="#FF0000">Rouge</SelectItem>
                    <SelectItem value="#00FF00">Vert clair</SelectItem>
                    <SelectItem value="#0000FF">Bleu</SelectItem>
                    <SelectItem value="#FFFF00">Jaune</SelectItem>
                    <SelectItem value="#FF00FF">Magenta</SelectItem>
                    <SelectItem value="#00FFFF">Cyan</SelectItem>
                    <SelectItem value="#800000">Marron</SelectItem>
                    <SelectItem value="#808000">Olive</SelectItem>
                    <SelectItem value="#008000">Vert</SelectItem>
                    <SelectItem value="#800080">Pourpre</SelectItem>
                    <SelectItem value="#008080">Teal</SelectItem>
                    <SelectItem value="#808080">Gris</SelectItem>
                    <SelectItem value="#C0C0C0">Argent</SelectItem>
                    <SelectItem value="#FFA500">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="etat">Etat</Label>
                <Select id="etat">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez l'état" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Neuf">Neuf</SelectItem>
                    <SelectItem value="Bonne état">Bonne état</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="brand">Marque</Label>
                <Input id="brand" placeholder="Entrez la marque" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Prix</Label>
                <Input id="price" placeholder="Entrez le prix" type="number" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="statut">Statut</Label>
                <Select id="statut">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="En vente">En vente</SelectItem>
                    <SelectItem value="Réserver">Réserver</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="taille">Taille</Label>
                <Select id="taille">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez la taille" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xs">XS</SelectItem>
                    <SelectItem value="s">S</SelectItem>
                    <SelectItem value="m">M</SelectItem>
                    <SelectItem value="l">L</SelectItem>
                    <SelectItem value="xl">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
            </div>
          </form>
        </div>
        <DialogFooter>
          <Button type="submit">Enregistrer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}