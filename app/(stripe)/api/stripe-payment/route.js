// app/api/stripe-payment/route.js
import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { articles, user } = await req.json();
    console.log('Received articles:', articles);
    console.log('Received user:', user);

    if (!articles || !Array.isArray(articles)) {
      return NextResponse.json({ message: "Invalid articles array" }, { status: 400 });
    }

    const line_items = articles.map(article => ({
      price_data: {
        currency: 'chf',
        product_data: {
          name: article.nomArticle,
        },
        unit_amount: article.prix * 100, // Convertir en centimes
      },
      quantity: 1,
    }));

    console.log('Line items:', line_items);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/user/${user.uid}/panier/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/user/${user.uid}/panier/checkout/cancel`,
    });

    console.log('Session created:', session.id);

    return NextResponse.json({ sessionId: session.id }, { status: 200 });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
