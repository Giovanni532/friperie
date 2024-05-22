"use client"

import { useStore } from '@/app/providers/StoreProvider'
import React from 'react'
import CardPanier from './components/CardPanier';

export default function Panier() {
  const {articles} = useStore();
  return (
    <div className='my-20 container center'>
      <h1 className="text-2xl font-bold p-3">Mon panier</h1>
      {articles.map(article => <CardPanier article={article} />)}
    </div>
  )
}
