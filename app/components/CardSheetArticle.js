"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ButtonWallet from "./ButtonWallet"
import ButtonPayment from "./ButtonPayment"

export default function CardSheetArticle({ article }) {
    return (
        <Card className="mb-8">
            <div className="flex gap-6">
                <div className="h-34">
                </div>
                <div className="flex flex-col justify-center pt-2">
                    <h3 className="text-xl font-bold mb-2">{article.nomArticle}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 ">
                        Taille : {article.taille}
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Prix : {article.prix}
                    </p>
                    <div className='flex flex-col md:flex-row '>
                        <ButtonWallet article={article} />
                        <ButtonPayment article={article} />
                    </div>
                </div>
            </div>
        </Card>
    )
}