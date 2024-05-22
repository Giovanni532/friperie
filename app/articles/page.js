import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { getData } from "../action/action";
import CardArticle from "../components/CardArticle";

export async function getArticles() {
  const result = await getData("article")
  return result
}

export default async function Page() {
    const articles = await getArticles();
  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-8 p-4 md:p-8 my-20">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Categories</h3>
          <div className="grid gap-2 mt-4">
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="category-electronics" />
              Electronics{"\n                    "}
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="category-clothing" />
              Clothing{"\n                    "}
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="category-home" />
              Home{"\n                    "}
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="category-beauty" />
              Beauty{"\n                    "}
            </Label>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Price Range</h3>
          <div className="grid gap-2 mt-4">
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="price-under50" />
              Under $50{"\n                    "}
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="price-50to100" />
              $50 - $100{"\n                    "}
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="price-100to200" />
              $100 - $200{"\n                    "}
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="price-over200" />
              Over $200{"\n                    "}
            </Label>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Rating</h3>
          <div className="grid gap-2 mt-4">
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="rating-4" />
              4 stars and above{"\n                    "}
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="rating-3" />
              3 stars and above{"\n                    "}
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="rating-2" />
              2 stars and above{"\n                    "}
            </Label>
            <Label className="flex items-center gap-2 font-normal">
              <Checkbox id="rating-1" />
              1 star and above{"\n                    "}
            </Label>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-start justify-items-center items-stretch gap-4">
        {articles.map(article => <CardArticle key={article.idArticle} article={article}/>)}
      </div>
    </div>
  )
}