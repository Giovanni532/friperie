"use client"

import React from 'react';
import { Button } from "@/components/ui/button";

const ButtonPayment = ({ article }) => {

    const submitPayment = () => {
        console.log("J'ai bien acheter :", article.nomArticle)
    }

  return (
        <Button className="my-2 mr-2" onClick={submitPayment}>Acheter l'article</Button>
  );
};

export default ButtonPayment;