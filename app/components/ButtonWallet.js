"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { useStore } from "../providers/StoreProvider";

const ButtonWallet = ({ article }) => {
  const { articles, addArticle, removeArticle } = useStore();

  const isInCart = articles.some(existingArticle => existingArticle.idArticle === article.idArticle);

  const handleAdd = () => {
    addArticle(article);
  };

  const handleRemove = () => {
    removeArticle(article.idArticle);
  };

  return (
    <>
      {isInCart ? (
        <Button className="my-2 mr-2" variant="outline" onClick={handleRemove}>Retirer du panier</Button>
      ) : (
        <Button className="my-2 mr-2" variant="outline" onClick={handleAdd}>Ajouter au panier</Button>
      )}
    </>
  );
};

export default ButtonWallet;