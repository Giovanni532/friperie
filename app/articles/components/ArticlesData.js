'use client';
import CardArticle from '@/app/components/CardArticle';
import SkeletonCardList from '@/app/components/SkeletonCardList';
import { Search } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState, useEffect } from "react";

export default function ArticlesData({ articles }) {
    const [query, setQuery] = useState("");
    const [priceOrder, setPriceOrder] = useState(null);
    const [statusFilters, setStatusFilters] = useState(new Set());
    const [categoryFilters, setCategoryFilters] = useState(new Set());
    const [sizeFilters, setSizeFilters] = useState(new Set());
    const [loading, setLoading] = useState(false);

    const handlePriceFilter = (order) => {
        setPriceOrder(order);
    };

    const handleStatusFilter = (status) => {
        setStatusFilters(prev => {
            const newSet = new Set(prev);
            if (newSet.has(status)) {
                newSet.delete(status);
            } else {
                newSet.add(status);
            }
            return newSet;
        });
    };

    const handleCategoryFilter = (category) => {
        setCategoryFilters(prev => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }
            return newSet;
        });
    };

    const handleSizeFilter = (size) => {
        setSizeFilters(prev => {
            const newSet = new Set(prev);
            if (newSet.has(size)) {
                newSet.delete(size);
            } else {
                newSet.add(size);
            }
            return newSet;
        });
    };

    const handleInput = (value) => {
        setLoading(true); // Démarrer le chargement
        setSizeFilters(new Set());
        setCategoryFilters(new Set());
        setPriceOrder(null);
        setStatusFilters(new Set());
        setQuery(value);
    };

    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => {
                setLoading(false); // Arrêter le chargement après 1 seconde
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [loading]);

    const filteredArticles = articles.filter(article => {
        if (query && !article.nomArticle.toLowerCase().includes(query.toLowerCase())) {
            return false;
        }

        if (statusFilters.size > 0 && !statusFilters.has(article.etat)) {
            return false;
        }

        if (categoryFilters.size > 0 && !categoryFilters.has(article.categorie)) {
            return false;
        }

        if (sizeFilters.size > 0 && !sizeFilters.has(article.taille)) {
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
                <ScrollArea className="p-5 h-full md:h-2/4 lg:h-4/6 rounded-md border">
                    <h3 className="text-lg font-semibold mb-4">Filtrer les articles</h3>
                    <div className="relative w-full max-w-md my-4">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <Input
                            className="mx-auto w-11/12 rounded-md bg-white px-10 py-2 text-sm shadow-sm dark:bg-gray-950 dark:text-gray-50"
                            placeholder="Rechercher ..."
                            type="search"
                            onChange={e => {
                                handleInput(e.target.value)
                            }}
                        />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-base font-medium mb-2">Prix</h4>
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="asc" onClick={() => handlePriceFilter("desc")} />
                                    Plus cher au moins cher
                                </Label>
                                <Label className="flex items-center gap-2">
                                    <Checkbox id="desc" onClick={() => handlePriceFilter("asc")} />
                                    Moins cher au plus cher
                                </Label>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-base font-medium mb-2">Catégories</h4>
                            <div className="space-y-2">
                                {["Robe", "Haut", "Bas", "Chaussures", "Bijoux", "Sacs", "Autre"].map(category => (
                                    <Label className="flex items-center gap-2" key={category}>
                                        <Checkbox id={category} onClick={() => handleCategoryFilter(category)} />
                                        {category}
                                    </Label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-base font-medium mb-2">État</h4>
                            <div className="space-y-2">
                                {["Neuf", "Comme neuf", "Bonne état"].map(status => (
                                    <Label className="flex items-center gap-2" key={status}>
                                        <Checkbox id={status} onClick={() => handleStatusFilter(status)} />
                                        {status}
                                    </Label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-base font-medium mb-2">Taille</h4>
                            <div className="space-y-2">
                                {["XS", "S", "M", "L", "XL", "U"].map(size => (
                                    <Label className="flex items-center gap-2" key={size}>
                                        <Checkbox id={size} onClick={() => handleSizeFilter(size)} />
                                        {size}
                                    </Label>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
            <div className="flex flex-wrap gap-8 justify-center">
                {loading ? (
                    <SkeletonCardList />
                ) : filteredArticles.length > 0 ? (
                    filteredArticles.map(article => <CardArticle key={article.idArticle} article={article} />)
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">Aucun résultat trouvé</p>
                )}
            </div>
        </div>
    );
}
