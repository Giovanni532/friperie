"use client"

import { useStore } from '@/app/providers/StoreProvider'
import React, { useState } from 'react'
import CardPanier from './components/CardPanier';
import { Button } from '@/components/ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Panier() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { articles } = useStore();
  const { user } = useAuthContext();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articles, user }),
      });

      const data = await response.json();

      if (response.ok) {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
        if (error) {
          console.error(error);
        }
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const pushToLivraison = () => {
    router.push(`/user/${user.uid}/panier/livraison`)
  }

  return (
    <div className='my-10 container center'>
      <h1 className="text-2xl font-bold p-3">Mon panier</h1>
      {articles.map(article => <CardPanier key={article.idArticle} article={article} user={user} />)}
      <Button onClick={pushToLivraison}>Valider mon panier</Button>
    </div>
  )
}
