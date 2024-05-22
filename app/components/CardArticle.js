"use client"

import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import ButtonWallet from './ButtonWallet'

export default function CardArticle({ article }) {
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
                        <Link
                            className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-gray-900 text-gray-50 text-sm font-medium transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300 w-1/2 mx-2 my-2"
                            href={`/articles/${article.idArticle}`}
                        >
                            Voir plus
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
