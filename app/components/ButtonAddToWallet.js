"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { useStore } from "../providers/StoreProvider";

const ButtonAddToWallet = ({ article }) => {
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
        <Button variant="outline" onClick={handleRemove}>Retirer du panier</Button>
      ) : (
        <Button variant="outline" onClick={handleAdd}>Ajouter au panier</Button>
      )}
    </>
  );
};

export default ButtonAddToWallet;