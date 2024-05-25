"use client"
import CardArticle from '@/app/components/CardArticle'
import SkeletonCardList from '@/app/components/SkeletonCardList'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect, useState } from "react";

export default function ArticlesData({ articles }) {

    const [query, setQuery] = useState("");
    const [priceOrder, setPriceOrder] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [sizeFilter, setSizeFilter] = useState(null);

    const handlePriceFilter = (order) => {
        setPriceOrder(order);
    };

    const handleStatusFilter = (status) => {
        setStatusFilter(status);
    };

    const handleCategoryFilter = (category) => {
        setCategoryFilter(category);
    };

    const handleSizeFilter = (size) => {
        setSizeFilter(size);
    };


    const resetFilter = () => {
        setCategoryFilter(null);
        setStatusFilter(null);
        setPriceOrder(null);
        setSizeFilter(null);
    }


    const filteredArticles = articles.filter(article => {
        if (query && !(
            article.nomArticle.toLowerCase().includes(query.toLowerCase())
        )) {
            return false;
        }

        if (statusFilter && article.etat !== statusFilter) {
            return false;
        }

        if (categoryFilter && article.categorie !== categoryFilter) {
            return false;
        }

        if (sizeFilter && article.taille !== sizeFilter) {
            return false;
        }

        return true;
    });

    if (priceOrder) {
        filteredArticles.sort((a, b) => {
            if (priceOrder === 'asc') {
                return a.prix - b.prix;
            } else if (priceOrder === 'desc') {
                return b.prix - a.prix;
            }
            return 0;
        });
    }




    return (
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 py-8 my-20">
            <div className="md:block">
                <ScrollArea className="p-5 h-2/3 md:h-2/4 lg:h-5/6 w-5/6 rounded-md border">
                    <h3 className="text-lg font-semibold mb-4">Filtrers les articles</h3>
                    <div className="relative w-full max-w-md my-4">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <Input
                            className="w-full rounded-md bg-white px-10 py-2 text-sm shadow-sm dark:bg-gray-950 dark:text-gray-50"
                            placeholder="Chercher un article ..."
                            type="search"
                            onChange={e => {
                                setQuery(e.target.value)
                            }}
                        />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-base font-medium mb-2">Prix</h4>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="asc" onClick={() => {handlePriceFilter("desc")}} />
                                    Plus cher au moins cher
                                </Label>
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="desc" onClick={() => {handlePriceFilter("asc")}} />
                                    Moins cher au plus cher
                                </Label>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-base font-medium mb-2">Catégories</h4>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="Robe" onClick={() => {handleCategoryFilter("Robe")}} />
                                    Robe
                                </Label>
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="Haut" onClick={() => {handleCategoryFilter("Haut")}} />
                                    Haut
                                </Label>
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="Bas" onClick={() => {handleCategoryFilter("Bas")}} />
                                    Bas
                                </Label>
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="Chaussures" onClick={() => {handleCategoryFilter("Chaussures")}} />
                                    Chaussures
                                </Label>
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="Bijoux" onClick={() => {handleCategoryFilter("Bijoux")}} />
                                    Bijoux
                                </Label>
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="Sacs" onClick={() => {handleCategoryFilter("Sacs")}} />
                                    Sacs
                                </Label>
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="Autre" onClick={() => {handleCategoryFilter("Autre")}} />
                                    Autre
                                </Label>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-base font-medium mb-2">Etat</h4>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="Neuf" onClick={() => {handleStatusFilter("Neuf")}} />
                                    Neuf
                                </Label>
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="Comme neuf" onClick={() => {handleStatusFilter("Comme neuf")}} />
                                    Comme neuf
                                </Label>
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="Bonne état" onClick={() => {handleStatusFilter("Bonne état")}} />
                                    Bonne état
                                </Label>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-base font-medium mb-2">Taille</h4>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="XS" onClick={() => {handleSizeFilter("XS")}} />
                                    XS
                                </Label>
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="S" onClick={() => {handleSizeFilter("S")}} />
                                    S
                                </Label>
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="M" onClick={() => {handleSizeFilter("M")}} />
                                    M
                                </Label>
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="L" onClick={() => {handleSizeFilter("L")}} />
                                    L
                                </Label>
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="XL" onClick={() => {handleSizeFilter("XL")}} />
                                    XL
                                </Label>
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="U" onClick={() => {handleSizeFilter("U")}} />
                                    U
                                </Label>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map(article => <CardArticle key={article.idArticle} article={article} />)}
            </div>
        </div>
    )
}

function SearchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}
