"use client"

import { useStore } from '@/app/providers/StoreProvider'
import React from 'react'
import CardPanier from './components/CardPanier';
import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { useRouter } from 'next/navigation';


export default function Panier() {
  const router = useRouter();
  const { articles } = useStore();
  const { user } = useAuthContext();


  const pushToLivraison = () => {
    user.adresse ? router.push(`/user/${user.uid}/panier/livraison/payments`) : router.push(`/user/${user.uid}/panier/livraison`)
  }

  return (
    <div className='my-10 container center'>
      <h1 className="text-2xl font-bold p-3">Mon panier</h1>
      {articles.map(article => <CardPanier key={article.idArticle} article={article} user={user} />)}
      <Button onClick={pushToLivraison}>Valider mon panier</Button>
    </div>
  )
}
