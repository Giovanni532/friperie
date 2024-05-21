"use client"

import { Button } from "@/components/ui/button";
import { useStore } from "../providers/StoreProvider";

const ButtonAddToWalllet = ({article}) => {
    const {addArticle} = useStore();

    const handleAdd = () => {
        return addArticle(article)
    }

    return <Button  variant="outline" onClick={handleAdd}>Ajouter au panier</Button>

}

export default ButtonAddToWalllet;