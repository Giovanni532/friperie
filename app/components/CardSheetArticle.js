"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useStore } from "../providers/StoreProvider"

export default function CardSheetArticle({ article }) {
    const { removeArticle } = useStore();

    const handleRemove = () => {
        removeArticle(article.idArticle);
    };

    return (
        <Card key={article.idArticle} className="mt-5 flex gap-6 h-32">
            <div className="p-5 flex items-start justify-between">
                <div className="grid gap-2">
                    <h3 className="text-xl font-semibold">{article.nomArticle}</h3>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Taille {article.taille}</div>
                </div>
            </div>
            <div className="flex items-end justify-between my-4">
                <div className="text-2xl px-3 py-1 font-bold">{article.prix}.-</div>
                <Button
                    className="py-1 text-xs font-medium bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-100"
                    variant="subtle"
                    onClick={handleRemove}
                >
                    Enlever du panier
                </Button>
            </div>
        </Card>
    )
}