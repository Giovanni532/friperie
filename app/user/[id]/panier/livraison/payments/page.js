"use client";

import { useStore } from '@/app/providers/StoreProvider';
import React, { useState } from 'react';
import PaymentsForm from './components/PaymentsForm';
import StripeProvider from '@/app/providers/StripeProvider';
import Link from 'next/link';

export default function Payments() {
    const { articles } = useStore();
    const [loadingPayments, setLoadingPayments] = useState(false);

    return (
        <StripeProvider>
            <div className="mt-8">
                {articles.length === 0 ? (
                    <div className="text-center p-4 bg-yellow-100 border border-yellow-300 text-yellow-700 rounded-md shadow-md">
                        <p>Il n'y a pas d'articles à acheter.</p>
                        <Link className="text-blue-500 underline hover:text-blue-700" href="/articles">
                            Voir les articles
                        </Link>
                    </div>
                ) : (
                    <PaymentsForm articles={articles} setLoadingPayments={setLoadingPayments}/>
                )}
            </div>
        </StripeProvider>
    );
}
