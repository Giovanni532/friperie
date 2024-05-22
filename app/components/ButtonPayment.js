"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const ButtonPayment = ({ articles, user }) => {
  const [loading, setLoading] = useState(false);

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


  return (
    <Button className="my-2 mr-2" onClick={handlePayment} disabled={loading}>
      {loading ? 'Redirection en cours ...' : "Acheter l'article"}
    </Button>
  );
};

export default ButtonPayment;