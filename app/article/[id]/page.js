import getDataWithId from '@/app/db/request/getData'
import React from 'react'
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import ButtonAddToWalllet from '@/app/components/ButtonAddToWallet';

export async function getArticle(id) {
  const { resultGetData } = await getDataWithId("article", id.toString());
  return resultGetData.data();
}

export default async function ArticleDetail({ params }) {
  const article = await getArticle(params.id);

  return (
    <div className="flex justify-center py-10 w-h">
      <div className="flex">
        <div className="w-96 flex flex-col items-center justify-center p-6 rounded-lg">
          <Carousel className="w-full max-w-md">
            <CarouselContent>
              <CarouselItem>
                <Image
                  alt={article.nomArticle}
                  className="w-full h-auto object-cover rounded-md"
                  height={350}
                  width={350}
                  src={article.images[0]}
                  style={{
                    aspectRatio: "350/350",
                    objectFit: "cover",
                  }}
                />
              </CarouselItem>
              <CarouselItem>
              <Image
                  alt={article.nomArticle}
                  className="w-full h-auto object-cover rounded-md"
                  height={350}
                  width={350}
                  src={article.images[0]}
                  style={{
                    aspectRatio: "350/350",
                    objectFit: "cover",
                  }}
                />
              </CarouselItem>
              <CarouselItem>
              <Image
                  alt={article.nomArticle}
                  className="w-full h-auto object-cover rounded-md"
                  height={350}
                  width={350}
                  src={article.images[0]}
                  style={{
                    aspectRatio: "350/350",
                    objectFit: "cover",
                  }}
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="w-96 p-10">
          <h1 className="text-3xl font-bold">{article.nomArticle}</h1>
          <p className="text-xl">Prix : {article.prix}.-</p>
          <p className="text-right">Ref: {article.idArticle}</p>
          <hr className="my-4" />
          <div className="flex justify-between">
            <Button variant="outline">
              Taille : {article.taille}
            </Button>
            <Button variant="outline">
              Etat : {article.etat}
            </Button>
          </div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center">
              <CircleIcon className="text-black mr-2" />
              <span>Couleur</span>
            </div>
            <p>Marque : {article.marque}</p>
          </div>
          <Separator className="my-6"/>
          <div className="flex flex-col space-y-4">
            <ButtonAddToWalllet article={article} />
            <Button>Acheter maintenant</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CircleIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}