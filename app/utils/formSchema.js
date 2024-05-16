import { z } from "zod";

export const articleSchema = z.object({
  nomArticle: z.string().min(1,{ message: "Le nom de l'article est requis" }),
  categorie: z.string().min(1,{ message: "La catégorie est requise" }),
  sousCategorie: z.string().min(1,{ message: "La sous-catégorie est requise" }),
  couleur: z.string().min(1,{ message: "La couleur est requise" }),
  etat: z.string().min(1,{ message: "L'état est requis" }),
  marque: z.string().min(1,{ message: "La marque est requise" }),
  prix: z.string().transform((val) => parseFloat(val)).refine((val) => !isNaN(val) && val > 0, { message: "Le prix doit être un nombre positif" }),
  statut: z.string().min(1,{ message: "Le statut est requis" }),
  taille: z.string().min(1,{ message: "La taille est requise" }),
  images: z.any().refine((files) => files.length > 0, { message: "Une image est requise pour un article" }),
});
