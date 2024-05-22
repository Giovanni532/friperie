import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { getData } from "../action/action";
import CardArticle from "../components/CardArticle";

export async function getArticles() {
  const result = await getData("article")
  return result
}



export default async function Articles() {
  const articles = await getArticles();

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
                  <Checkbox id="category-1" />
                  Clothing
                </Label>
                <Label className="flex items-center gap-2">
                  <Checkbox id="category-2" />
                  Electronics
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => <CardArticle key={article.idArticle} article={article}/>)}
        </div>
      </div>
    </>
  )
}

function FilterIcon(props) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function ListIcon(props) {
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
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
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

