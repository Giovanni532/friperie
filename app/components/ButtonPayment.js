"use client"

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { useAuthContext } from '../providers/AuthProvider';


const ButtonPayment = ({ articles }) => {
  const [access, setAccess] = useState(false);
  const {user} = useAuthContext();

  useEffect(() => {
    user ? setAccess(false) : setAccess(true)
  }, [])

  return (
    <Button className="my-2 mr-2" disabled={access}>
      Acheter l'article
    </Button>
  );
};

export default ButtonPayment;