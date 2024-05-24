'use client';

import { revalidateWebSite } from '@/app/action/action';
import addDataWithId from '@/app/db/request/addDataWithId';
import { updateData } from '@/app/db/request/updateDoc';
import { getNextCommandeId } from '@/app/db/utils/getNextArticleId';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { useStore } from '@/app/providers/StoreProvider';
import getFormattedDate, { getFormattedDateWithOffset } from '@/app/utils/(client)/getFormatedData';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useStripe, useElements, CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const PaymentsForm = ({ articles }) => {
  const { removeAllArticles } = useStore();
  const stripe = useStripe();
  const router = useRouter();
  const { user } = useAuthContext();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    prenom: user.username.split(" ")[0],
    nom: user.username.split(" ")[1],
    email: user.email,
    adresse: user.adresse,
    ville: user.ville,
    nip: user.nip,
  });

  useEffect(() => {
    // Calculer le prix total
    const total = articles.reduce((acc, article) => acc + article.prix, 0);
    setTotalPrice(total);
  }, [articles]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/stripe-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ articles, formData }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Something went wrong');
        setLoading(false);
        return;
      }

      const { clientSecret } = data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: `${formData.prenom} ${formData.nom}`,
            email: formData.email,
            address: {
              line1: formData.adresse,
              city: formData.ville,
              postal_code: formData.nip,
            },
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          let idArticle = [];
          articles.map(article => {
            idArticle.push(article.idArticle);
            updateData(article.idArticle.toString(), "article", { statut: "Vendu" });
          });

          idArticle = idArticle.join(', ');

          const idCommande = await getNextCommandeId();

          const commande = {
            adresse: formData.adresse,
            createdAt: new Date().toDateString(),
            date: getFormattedDate(),
            dateDeLivraison: getFormattedDateWithOffset(14),
            idArticle,
            idCommande,
            nip: formData.nip,
            prixCommande: totalPrice,
            statutCommande: "En traitement",
            emailUser: formData.email,
            usernameUser: formData.prenom + " " + formData.nom,
            ville: formData.ville,
          };

          await addDataWithId("commande", idCommande.toString(), commande);

          removeAllArticles();

          await revalidateWebSite();

          router.push(`/user/${user.uid}/panier/livraison/payments/success`);
        }
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
      <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Articles achetés</h2>
        <ul className="space-y-4">
          {articles.map((article) => (
            <div key={article.idArticle}>
              <li className="flex justify-between">
                <span className="font-medium">{article.nomArticle}</span>
                <span className="font-medium">{article.prix} CHF</span>
              </li>
              <Separator className="my-4" />
            </div>
          ))}
        </ul>
        <span className="font-medium">Total : {totalPrice} CHF</span>
      </div>
      <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-8 bg-white rounded-lg shadow-md space-y-4">
        <h2 className="text-lg font-semibold mb-4">Paiement</h2>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleInputChange}
              placeholder="First Name"
              className="w-1/2 p-3 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="w-1/2 p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="adresse"
            value={formData.adresse}
            onChange={handleInputChange}
            placeholder="Address"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <div className="flex space-x-4">
            <input
              type="text"
              name="ville"
              value={formData.ville}
              onChange={handleInputChange}
              placeholder="City"
              className="w-2/3 p-3 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="nip"
              value={formData.nip}
              onChange={handleInputChange}
              placeholder="Postal Code"
              className="w-1/3 p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        <CardNumberElement options={cardElementOptions} className="p-3 border border-gray-300 rounded-md mb-4"/>
        <CardExpiryElement options={cardElementOptions} className="p-3 border border-gray-300 rounded-md mb-4"/>
        <CardCvcElement options={cardElementOptions} className="p-3 border border-gray-300 rounded-md mb-4"/>
        <Button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full bg-blue-500 text-white py-3 px-4 rounded-md 
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 transition-colors'}`}
        >
          {loading ? 'En cours de paiements ...' : `Payer ${totalPrice} CHF`}
        </Button>
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default PaymentsForm;
