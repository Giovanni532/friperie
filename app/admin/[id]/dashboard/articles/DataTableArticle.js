"use client"

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { PaginationPrevious, PaginationItem, PaginationLink, PaginationNext, PaginationContent, Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu";
import { IoFilter } from "react-icons/io5";
import { MdOutlineFilterListOff } from "react-icons/md";
import DeleteButton from '../components/DeleteButton';
import UpdateButtonArticle from '../components/UpdateButtonArticle';



export default function DataTableArticle({ columns, articles }) {
  // Etat pour rechercher par nom d'article
  const [query, setQuery] = useState("");
  const [priceOrder, setPriceOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);

  // État pour suivre l'index de la page actuelle
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 5;

  const handlePriceFilter = (order) => {
    setPriceOrder(order);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  };

  const resetFilter = () => {
    setCategoryFilter(null);
    setStatusFilter(null);
    setPriceOrder(null);
    setCurrentPage(1);
  }


  // Filtrer les articles en fonction de la demande
  const filteredArticles = articles.filter(article => {
    // Filtre de recherche
    if (query && !(
      article.nomArticle.toLowerCase().includes(query.toLowerCase()) || // Recherche par nomArticle
      article.idArticle.toString().toLowerCase().includes(query.toLowerCase()) // Recherche par idArticle
    )) {
      return false;
    }

    // Filtre de statut
    if (statusFilter && article.statut !== statusFilter) {
      return false;
    }

    // Filtre de catégorie
    if (categoryFilter && article.categorie !== categoryFilter) {
      return false;
    }

    return true;
  });

  // Filtre de prix
  if (priceOrder) {
    filteredArticles.sort((a, b) => {
      if (priceOrder === 'asc') {
        return a.prix - b.prix;
      } else if (priceOrder === 'desc') {
        return b.prix - a.prix;
      }
      return 0;
    });
  }

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Fonction pour changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold p-3">Articles</h1>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <Input
            className="flex-1 max-w-lg bg-gray-100 dark:bg-gray-800 border-none shadow-none mb-4 lg:mb-0"
            placeholder="Chercher un article .."
            type="search"
            name="query"
            onChange={e => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <IoFilter className="w-4 h-4 mr-4" />
                Filtrer par prix
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[240px]">
              <DropdownMenuCheckboxItem onClick={() => handlePriceFilter("asc")}>Plus petit au plus grand</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem onClick={() => handlePriceFilter("desc")}>Plus grand au plus petit</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <IoFilter className="w-4 h-4 mr-4" />
                Filtrer par statut
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              <DropdownMenuCheckboxItem onClick={() => handleStatusFilter("Vendu")}>Vendu</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem onClick={() => handleStatusFilter("En vente")}>En vente</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <IoFilter className="w-4 h-4 mr-4" />
                Filtrer par categorie
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]">
              <DropdownMenuCheckboxItem onClick={() => handleCategoryFilter("Haut")}>Haut</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem onClick={() => handleCategoryFilter("Bas")}>Bas</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem onClick={() => handleCategoryFilter("Chaussure")}>Chaussure</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem onClick={() => handleCategoryFilter("Autre")}>Autre</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {priceOrder || categoryFilter || statusFilter ?
            (
              <Button size="sm" variant="outline" onClick={resetFilter}>
                <MdOutlineFilterListOff className="w-4 h-4 mr-4" />
                Enlever les filtres
              </Button>
            )
            :
            null
          }
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(col => (
                <TableHead key={col.key}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentArticles.map((article, index) => (
              <TableRow key={index}>
                {columns.map(col => (
                  <TableCell key={col.key}>
                    {col.key !== "action" ? (
                      col.key === "prix" ? (
                        article[col.key] + ".-"
                      ) : (
                        article[col.key]
                      )
                    ) : (
                      <div className="flex items-center gap-2">
                        <UpdateButtonArticle article={article}/>
                        <DeleteButton
                          documentId={article.idArticle}
                          collectionName="article"
                          nameArticle={article.nomArticle}
                        />
                      </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-6">
        <Pagination>
          <PaginationContent>
            <div className="flex items-center justify-between mt-6">
              {filteredArticles.length > 0 && (
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => paginate(currentPage - 1)} />
                      </PaginationItem>
                    )}
                    {[...Array(Math.ceil(filteredArticles.length / articlesPerPage)).keys()].map((pageNumber, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink href="#" isActive={pageNumber + 1 === currentPage} onClick={() => paginate(pageNumber + 1)}>
                          {pageNumber + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    {currentPage < Math.ceil(filteredArticles.length / articlesPerPage) && (
                      <PaginationItem>
                        <PaginationNext href="#" onClick={() => paginate(currentPage + 1)} />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
              {filteredArticles.length === 0 && (
                <div>
                  <span className="text-center text-gray-500">Aucun résultat trouvé.</span>
                </div>
              )}
            </div>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}