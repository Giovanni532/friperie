import React from 'react'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import ButtonWallet from '@/app/components/ButtonWallet'
import ButtonPayment from '@/app/components/ButtonPayment'

export default function CardPanier({article}) {
    return (
        <Card className="mb-8">
          <div className="flex gap-6">
            <div>
            <Image
                    className="h-64 w-64"
                    priority
                    src={article.images[0]} 
                    alt={article.nomArticle}
                    width={300}
                    height={300}
                />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-2">{article.nomArticle}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 ">
                Taille : {article.taille}
              </p>
              <p className="text-zinc-500 dark:text-zinc-400">
                Prix : {article.prix}
              </p>
              <div className='flex flex-col md:flex-row'>
                <ButtonWallet article={article}/>
                <ButtonPayment article={article} />
              </div>
            </div>
          </div>
        </Card>
    )
}
