"use client"
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

export default function DetailView({article}) {
  return (
    <div className="flex justify-center py-10 w-h">
      <div className="flex">
        <div className="w-96 flex flex-col items-center justify-center p-6 border rounded-lg">
          <Carousel className="w-full max-w-md">
            <CarouselContent>
              <CarouselItem>
                <img
                  alt="T-shirt"
                  className="w-full h-auto object-cover rounded-md"
                  height="300"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/300",
                    objectFit: "cover",
                  }}
                  width="300"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  alt="T-shirt"
                  className="w-full h-auto object-cover rounded-md"
                  height="300"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/300",
                    objectFit: "cover",
                  }}
                  width="300"
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  alt="T-shirt"
                  className="w-full h-auto object-cover rounded-md"
                  height="300"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "300/300",
                    objectFit: "cover",
                  }}
                  width="300"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="w-96 p-10">
          <h1 className="text-3xl font-bold">Titre de l'article</h1>
          <p className="text-xl">Prix</p>
          <p className="text-right">Ref: 643456</p>
          <hr className="my-4" />
          <div className="flex justify-between">
            <Button className="border-red-300 text-red-500" variant="outline">
              Taille
            </Button>
            <Button className="border-red-300 text-red-500" variant="outline">
              Etat
            </Button>
          </div>
          <div className="flex items-center justify-between my-4">
            <div className="flex items-center">
              <CircleIcon className="text-black mr-2" />
              <span>Couleur</span>
            </div>
            <p>Marque : jfxjhb</p>
          </div>
          <div className="flex flex-col space-y-4">
            <Button className="bg-red-300 text-white">Ajouter au panier</Button>
            <Button className="bg-red-300 text-white">Acheter maintenant</Button>
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