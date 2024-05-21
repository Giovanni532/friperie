"use client"

import React, { createContext, useContext, useState } from 'react';

// Créez le contexte du store
const StoreContext = createContext({});

// Créez un fournisseur pour partager le store à travers toute l'application
export const StoreProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  const addArticle = (article) => {
    setArticles((prevArticles) => [...prevArticles, article]);
  };

  const store = {
    articles,
    addArticle,
  };

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

// Créez un consommateur pour être appelé dans vos composants
export const useStore = () => {
  const store = useContext(StoreContext);
  return store;
};

/* comment utiliser le store */
/* const articles, addArticles = useSTore(); */