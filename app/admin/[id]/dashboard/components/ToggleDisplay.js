"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import React, { useState } from 'react'
import ModalArticle from './ModalArticle'
import DataTableArticle from '../articles/DataTableArticle'
import ColumnsArticle from '../articles/ColumnsArticle'
import ColumnsCommandes from "../commandes/ColumnsCommande"
import DataTableCommande from "../commandes/DataTableCommande"

export default function ToggleDisplay({ articles, commandes }) {
    const [toggle, setToggle] = useState(true)
    const handleToggle = (bool) => {
        setToggle(bool)
    }
    return (
        <div className="container mx-auto py-10 ">
            <div className="p-2">
                <ToggleGroup type="single">
                    <ToggleGroupItem value="Afficher les articles" onClick={() => handleToggle(true)}>
                        Afficher les articles
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Afficher les commandes" onClick={() => handleToggle(false)}>
                        Afficher les commandes
                    </ToggleGroupItem>
                    <ModalArticle />
                </ToggleGroup>
            </div>
            {toggle ? <DataTableArticle columns={ColumnsArticle} articles={articles} />
                :
                <DataTableCommande columns={ColumnsCommandes} commandes={commandes}/>
            }
        </div>
    )
}
