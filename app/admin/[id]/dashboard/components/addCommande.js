"use client"

import addDataWithId from '@/app/db/request/addDataWithId';
import { getNextCommandeId } from '@/app/db/utils/getNextArticleId';
import getFormattedDate, { getFormattedDateWithOffset } from '@/app/utils/(client)/getFormatedData';
import React from 'react'

export default function AddCommande() {

    const createCommande = async () => {
        const id = await getNextCommandeId();
        const data = {
          adresse: "42 rue de la Prulay",
          createdAt: new Date().toDateString(),
          date: getFormattedDate(),
          dateDeLivraison: getFormattedDateWithOffset(14),
          idArticle: 1,
          idCommande: id,
          nip: 1217,
          prixCommande: 15,
          statutCommande: "En traitement",
          usernameUser: "Giovanni Salcuni",
          ville: "Meyrin"
        }
        await addDataWithId("commande", id.toString(), data)
    }
  return (
    <button onClick={createCommande}>
        Ajouter une commande
    </button>
  )
}
