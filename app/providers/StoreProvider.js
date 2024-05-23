"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext({});

export const StoreProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

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

  const removeAllArticles = () => {
    setArticles([]);
    localStorage.setItem('panierArticles', JSON.stringify([]));
  };

  const store = {
    articles,
    addArticle,
    removeArticle,
    removeAllExcept,
    removeAllArticles
  };

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(StoreContext);
  return store;
};