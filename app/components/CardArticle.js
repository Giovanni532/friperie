"use client"

import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import ButtonWallet from './ButtonWallet'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function CardArticle({ article }) {
    const router = useRouter();

    const handlePush = () => {
        router.push(`/articles/${article.idArticle}`)
    }
    return (
        <div key={article.idArticle} className="z-0 w-72 group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 mx-auto">
            <div className="block" href="#">
                <Image
                    className="w-full h-64"
                    src={article.images[0]}
                    alt={article.nomArticle}
                    width={300}
                    height={300}
                />
                <div className="bg-white dark:bg-gray-950 p-4">
                    <h3 className="text-lg font-semibold">{article.nomArticle}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{article.prix} .-</p>
                    <div className="flex justify-between items-center mt-4">
                        <ButtonWallet article={article} />
                        <Button
                            onClick={handlePush}
                        >
                            Voir plus
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
