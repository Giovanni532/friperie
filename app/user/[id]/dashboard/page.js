'use client'

import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@/app/providers/AuthProvider';
import { useRouter } from 'next/navigation';

export default function Page() {
    const { user } = useAuthContext();
    const router = useRouter();

    return (
        <div>User admin page (alisson)</div>
    )
}
