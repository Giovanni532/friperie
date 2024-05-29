import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogContent, Dialog } from "@/components/ui/dialog"
import getDataWithId from '@/app/db/request/getDataWithId'
import { getData } from '@/app/action/action'
import { CommandeData } from './components/CommandesData'
import UpdateProfil from './components/UpdateProfil'
import Image from 'next/image'
import ImageProfile from './components/ImageProfile'
import UpdatePassword from './components/UpdatePassword'

export async function getUser(id) {
  const user = await getDataWithId("user", id)
  return user.resultGetData.data()
}

export async function getUserCommandes(id) {
  const commandes = await getData("commande")
  return commandes.filter(commande => commande.idUser === id)
}

export default async function User({ params }) {
  const user = await getUser(params.id)
  const commandes = await getUserCommandes(params.id)

  return (
    <div className='my-20 flex justify-center'>
      <Tabs defaultValue="profil" className="mx-auto px-2 w-full sm:w-[380px] md:w-8/12 lg:w-7/12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profil">Mon profile</TabsTrigger>
          <TabsTrigger value="updateProfil">Modifier le profile</TabsTrigger>
          <TabsTrigger value="commandes">Commandes</TabsTrigger>
        </TabsList>
        <TabsContent value="profil">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Mon profil</CardTitle>
              <CardDescription>
                Vos informations personnelles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 flex flex-col items-center">
              <ImageProfile user={user} />
              <div className="space-y-1">
                <p>{user.username}</p>
              </div>
              <div className="space-y-1">
                <p>{user.email}</p>
              </div>
              <div className="space-y-1">
                <p>{`${user.adresse}, ${user.nip}, ${user.ville}`}</p>
              </div>
              <div className="space-y-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Changer de mot de passe</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Modifier votre mot de passe.</DialogTitle>
                      <DialogDescription>
                        Remplissez les informations ci-dessous pour ajouter un nouvel article à votre inventaire.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 h-1/2">
                      <UpdatePassword />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="updateProfil">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Modifier mes informations.</CardTitle>
              <CardDescription>
                Ici vous pouvez changez vos informations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <UpdateProfil user={user} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="commandes">
          <Card className="w-9/12 md:w-full lg:w-full mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Mes commandes</CardTitle>
              <CardDescription>
                Toutes vos commandes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <CommandeData commandes={commandes} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
