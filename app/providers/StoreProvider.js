"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

// Créez le contexte du store
const StoreContext = createContext({});

// Créez un fournisseur pour partager le store à travers toute l'application
export const StoreProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  // Charger les articles depuis le localStorage lorsqu'on monte le composant
  useEffect(() => {
    const storedArticles = localStorage.getItem('panierArticles');
    if (storedArticles) {
      setArticles(JSON.parse(storedArticles));
    }
  }, []);

  const addArticle = (article) => {
    const articleExists = articles.some(existingArticle => existingArticle.idArticle === article.idArticle);
    if (!articleExists) {
      const updatedArticles = [...articles, article];
      setArticles(updatedArticles);
      localStorage.setItem('panierArticles', JSON.stringify(updatedArticles));
    }
  };

  const removeArticle = (idArticle) => {
    const updatedArticles = articles.filter(article => article.idArticle !== idArticle);
    setArticles(updatedArticles);
    localStorage.setItem('panierArticles', JSON.stringify(updatedArticles));
  };

  const removeAllExcept = (articleToBuy) => {
    const articleExists = articles.some(article => article.idArticle === articleToBuy.idArticle);
    let updatedArticles;

    if (articleExists) {
      updatedArticles = articles.filter(article => article.idArticle === articleToBuy.idArticle);
    } else {
      updatedArticles = [articleToBuy];
    }

    setArticles(updatedArticles);
    localStorage.setItem('panierArticles', JSON.stringify(updatedArticles));
  };

  const store = {
    articles,
    addArticle,
    removeArticle,
    removeAllExcept,
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