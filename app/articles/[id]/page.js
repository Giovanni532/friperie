import getDataWithId from '@/app/db/request/getDataWithId'
import React from 'react'
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import ButtonWallet from '@/app/components/ButtonWallet';

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
              {article.images.map(image => (
                <CarouselItem>
                <Image
                  alt={article.nomArticle}
                  className="w-full h-auto object-cover rounded-md"
                  height={350}
                  width={350}
                  src={image}
                  style={{
                    aspectRatio: "350/350",
                    objectFit: "cover",
                  }}
                />
              </CarouselItem>
              ))}
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
            <p className="border p-3 rounded">
              Taille : {article.taille}
            </p>
            <p className="border p-3 rounded">
              Etat : {article.etat}
            </p>
          </div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center">
            <span>Couleur :</span>
            <div class="mx-2 my-2 w-4 h-4 border rounded-full circle" style={{backgroundColor: article.couleur}}></div>
            </div>
            <p>Marque : {article.marque}</p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-4">
            <ButtonWallet article={article} />
            <Button>Acheter maintenant</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
