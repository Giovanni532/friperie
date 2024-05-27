"use server"

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
import getDataWithId from '@/app/db/request/getDataWithId'
import { getData } from '@/app/action/action'
import { CommandeData } from './components/CommandesData'
import UpdateProfil from './components/UpdateProfil'

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
      <Tabs defaultValue="profil" className="w-10/12 mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profil">Mon profil</TabsTrigger>
          <TabsTrigger value="updateProfil">Modifier mon profil</TabsTrigger>
          <TabsTrigger value="commandes">Mes commandes</TabsTrigger>
        </TabsList>
        <TabsContent value="profil">
          <Card>
            <CardHeader>
              <CardTitle>Mon profil</CardTitle>
              <CardDescription>
                Vos informations personnelles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <p>Prenom : {user.username.split(" ")[0]}</p>
              </div>
              <div className="space-y-1">
                <p>Nom : {user.username.split(" ")[1]}</p>
              </div>
              <div className="space-y-1">
                <p>Email : {user.email}</p>
              </div>
              <div className="space-y-1">
                <p>Adresse complete : {`${user.adresse}, ${user.nip}, ${user.ville}`}</p>
              </div>
              <div className="space-y-1">
                <Button>modifier mon mot de passe</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="updateProfil">
          <Card>
            <CardHeader>
              <CardTitle>Modifier mes informations.</CardTitle>
              <CardDescription>
                Ici vous pouvez changez vos informations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <UpdateProfil user={user}/>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="commandes">
          <Card>
            <CardHeader>
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
