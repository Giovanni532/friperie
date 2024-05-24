// app/api/stripe-payment/route.js
import { NextResponse } from 'next/server';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { articles } = await req.json();

    // Normaliser les articles pour qu'ils soient toujours un tableau
    const normalizedArticles = Array.isArray(articles) ? articles : [articles];

    // Vérifier si le tableau d'articles est valide
    if (!normalizedArticles.length || !normalizedArticles.every(article => article.nomArticle && article.prix)) {
      return NextResponse.json({ message: "Invalid articles array" }, { status: 400 });
    }

    const line_items = normalizedArticles.map(article => ({
      price_data: {
        currency: 'chf',
        product_data: {
          name: article.nomArticle,
        },
        unit_amount: article.prix * 100, // Convertir en centimes
      },
      quantity: 1,
    }));

    const paymentIntent = await stripe.paymentIntents.create({
      amount: normalizedArticles.reduce((total, article) => total + article.prix * 100, 0),
      currency: 'chf',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 });
  } catch (error) {
    console.error('Error creating Stripe PaymentIntent:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
