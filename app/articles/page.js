'use client';

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import ArticlesList from "../components/ArticlesList";
import { Suspense, useState } from "react";
import SkeletonCardList from "../components/SkeletonCardList";


export default function Articles() {
  const [sortOption, setSortOption] = useState(''); // État pour l'option de tri

  // Fonctions de tri
  const sortArticles = (articles) => {
    if (sortOption === 'priceAsc') {
      return articles.sort((a, b) => a.prix - b.prix);
    }
    if (sortOption === 'priceDesc') {
      return articles.sort((a, b) => b.prix - a.prix);
    }
    return articles;
  };
  return (
    <>
      <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 py-8 my-20">
        <div className="md:block ">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          <div className="relative w-full max-w-md my-4">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
              <Input
                className="w-full rounded-md bg-white px-10 py-2 text-sm shadow-sm dark:bg-gray-950 dark:text-gray-50"
                placeholder="Search products..."
                type="search"
              />
            </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-base font-medium mb-2">Category</h4>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Checkbox onClick={() => setSortOption('priceAsc')} id="category-1" />
                  Plus cher au moins
                </Label>
                <Label className="flex items-center gap-2">
                  <Checkbox onClick={() => setSortOption('priceDesc')} id="category-2" />
                  Moins cher au plus cher
                </Label>
                <Label className="flex items-center gap-2">
                  <Checkbox id="category-3" />
                  Home & Garden
                </Label>
              </div>
            </div>
            <div>
              <h4 className="text-base font-medium mb-2">Price</h4>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Checkbox id="price-1" />
                  Under $50
                </Label>
                <Label className="flex items-center gap-2">
                  <Checkbox id="price-2" />
                  $50 - $100
                </Label>
                <Label className="flex items-center gap-2">
                  <Checkbox id="price-3" />
                  Over $100
                </Label>
              </div>
            </div>
            <div>
              <h4 className="text-base font-medium mb-2">Brand</h4>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Checkbox id="brand-1" />
                  Brand A
                </Label>
                <Label className="flex items-center gap-2">
                  <Checkbox id="brand-2" />
                  Brand B
                </Label>
                <Label className="flex items-center gap-2">
                  <Checkbox id="brand-3" />
                  Brand C
                </Label>
              </div>
            </div>
          </div>
        </div>
        <Suspense fallback={<SkeletonCardList count={3} />}>
          <ArticlesList sortArticles={sortArticles} />
        </Suspense>
      </div>
    </>
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

