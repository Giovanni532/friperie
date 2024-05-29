import { z } from "zod";

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Le mot de passe actuel est requis.'),
  newPassword: z.string().min(6, 'Le nouveau mot de passe doit contenir au moins 6 caractères.'),
});


export const signupFormSchema = z.object({
  prenom: z.string().min(3, {
    message: "Entrer votre prenom.",
  }),
  nom: z.string().min(3, {
    message: "Entre votre nom.",
  }),
  email: z.string().email({
    message: "Email invalide, veuillez entrer un mail valide.",
  }),
  password: z.string().min(8, {
    message: "Votre mot de passe doit contenir au moins 8 caractères.",
  })
});

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Email invalide, veuillez entrer un mail valide.",
  }),
  password: z.string().min(8, {
    message: "Votre mot de passe doit contenir au moins 8 caractères.",
  })
});

export const updateUserFormSchema = z.object({
  prenom: z.string().min(3, {
    message: "Entrer votre prenom.",
  }),
  nom: z.string().min(3, {
    message: "Entre votre nom.",
  }),
  email: z.string().email({
    message: "Email invalide, veuillez entrer un mail valide.",
  }),
  adresse: z.string().min(8, {
    message: "Votre adresse doit contenir au moins 8 caractères.",
  }),
  nip: z.string().min(4, { message: "Entrer votre code postal" }).transform((val) => parseFloat(val)).refine((val) => !isNaN(val) && val > 0, { message: "Entrer votre code postal" }),
  ville: z.string().min(3, {
    message: "Votre ville doit contenir au moins 3 caractères.",
  })
});


export const livraisonFormSchema = z.object({
  nip: z.string().min(4, { message: "Entrer votre code postal" }).transform((val) => parseFloat(val)).refine((val) => !isNaN(val) && val > 0, { message: "Entrer votre code postal" }),
  ville: z.string().min(3, {
    message: "Entrer une ville s'il vous plait",
  }),
  adresse: z.string().min(5, {
    message: "Entrer une adresse s'il vous plait",
  })
});

export const articleSchema = z.object({
  nomArticle: z.string().min(1, { message: "Le nom de l'article est requis" }),
  categorie: z.string().min(1, { message: "La catégorie est requise" }),
  sousCategorie: z.string().min(1, { message: "La sous-catégorie est requise" }),
  couleur: z.string().min(1, { message: "La couleur est requise" }),
  etat: z.string().min(1, { message: "L'état est requis" }),
  marque: z.string().min(1, { message: "La marque est requise" }),
  prix: z.string().transform((val) => parseFloat(val)).refine((val) => !isNaN(val) && val > 0, { message: "Le prix doit être un nombre positif" }),
  statut: z.string().min(1, { message: "Le statut est requis" }),
  taille: z.string().min(1, { message: "La taille est requise" }),
  images: z.any().refine((files) => files.length > 0, { message: "Une image est requise pour un article" }),
});


export const articleUpdateSchema = z.object({
  nomArticle: z.string().min(1, { message: "Le nom de l'article est requis" }),
  categorie: z.string().min(1, { message: "La catégorie est requise" }),
  sousCategorie: z.string().min(1, { message: "La sous-catégorie est requise" }),
  couleur: z.string().min(1, { message: "La couleur est requise" }),
  etat: z.string().min(1, { message: "L'état est requis" }),
  marque: z.string().min(1, { message: "La marque est requise" }),
  prix: z.string().transform((val) => parseFloat(val)).refine((val) => !isNaN(val) && val > 0, { message: "Le prix doit être un nombre positif" }),
  statut: z.string().min(1, { message: "Le statut est requis" }),
  taille: z.string().min(1, { message: "La taille est requise" }),
});

export const commandeSchema = z.object({
  statut: z.string().min(1, { message: "Le statut est requis" }),
});