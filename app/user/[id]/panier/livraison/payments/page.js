"use client"

import { useStore } from '@/app/providers/StoreProvider'
import React from 'react'
import PaymentsForm from './components/PaymentsForm';
import StripeProvider from '@/app/providers/StripeProvider';

export default function Payments() {
    const { articles } = useStore();
    return (
        <StripeProvider>
            <div className="mt-8">
                <PaymentsForm articles={articles} />
            </div>
        </StripeProvider>
    )
}
