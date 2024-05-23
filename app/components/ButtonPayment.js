"use client"

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { useAuthContext } from '../providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useStore } from '../providers/StoreProvider';


const ButtonPayment = ({ article }) => {
  const [access, setAccess] = useState(false);
  const { user } = useAuthContext();
  const router = useRouter();
  const { removeAllExcept } = useStore();

  useEffect(() => {
    user ? setAccess(false) : setAccess(true)
  }, [])

  const handlePayment = () => {
    removeAllExcept(article)
    user.adresse ? router.push(`/user/${user.uid}/panier/livraison/payments`) : router.push(`/user/${user.uid}/panier/livraison`)
  }

  return (
    <Button onClick={handlePayment} className="my-2 mr-2" disabled={access}>
      Acheter l'article
    </Button>
  );
};

export default ButtonPayment;