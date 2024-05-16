"use client"

import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogContent, Dialog } from "@/components/ui/dialog"
import FormArticle from "./FormArticle"

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
        <div className="grid gap-4 py-4 h-1/2">
          <FormArticle/>
        </div>
      </DialogContent>
    </Dialog>
  )
}