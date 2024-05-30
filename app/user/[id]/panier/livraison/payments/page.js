"use client";

import { useStore } from '@/app/providers/StoreProvider';
import React, { useState, useEffect } from 'react';
import PaymentsForm from './components/PaymentsForm';
import StripeProvider from '@/app/providers/StripeProvider';
import Link from 'next/link';

export default function Payments() {
    const { articles } = useStore();
    const [localArticles, setLocalArticles] = useState([]);

    useEffect(() => {
        if (articles.length > 0) {
            setLocalArticles(articles);
        }
    }, [articles]);

    return (
        <StripeProvider>
            <div className="mt-8">
                {localArticles.length === 0 ? (
                    <div className="text-center p-4 bg-yellow-100 border border-yellow-300 text-yellow-700 rounded-md shadow-md">
                        <p>Il n&apos;y a pas d&apos;articles à acheter.</p>
                        <Link className="text-blue-500 underline hover:text-blue-700" href="/articles">
                            Voir les articles
                        </Link>
                    </div>
                ) : (
                    <PaymentsForm articles={localArticles} />
                )}
            </div>
        </StripeProvider>
    );
}
