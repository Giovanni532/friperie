"use client"

import { Button } from '@/components/ui/button'
import React from 'react'

export default function ButtonForScroll() {

    const scrollToArticles = () => {
        const element = document.getElementById('articles');
        element.classList.add('scroll-animation');
        element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Button
            onClick={scrollToArticles}
            className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-gray-900 text-gray-50 text-sm font-medium transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
        >
            Trouvez votre style
        </Button>
    )
}
