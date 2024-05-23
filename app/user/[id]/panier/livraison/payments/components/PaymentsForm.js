'use client';

import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';

const PaymentsForm = ({ articles }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
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
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            address: {
              line1: formData.address,
              city: formData.city,
              postal_code: formData.postalCode,
            },
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          // Payment succeeded
          console.log('Payment succeeded');
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
            <li key={article.idArticle} className="flex justify-between">
              <span className="font-medium">{article.nomArticle}</span>
              <span className="font-medium">{article.prix} CHF</span>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-8 bg-white rounded-lg shadow-md space-y-4">
        <h2 className="text-lg font-semibold mb-4">Paiement</h2>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="w-1/2 p-3 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
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
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <div className="flex space-x-4">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              className="w-2/3 p-3 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              placeholder="Postal Code"
              className="w-1/3 p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        <CardElement options={cardElementOptions} className="p-3 border border-gray-300 rounded-md mb-4" />
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full bg-blue-500 text-white py-3 px-4 rounded-md 
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 transition-colors'}`}
        >
          {loading ? 'Processing...' : `Pay ${totalPrice} CHF`}
        </button>
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default PaymentsForm;
