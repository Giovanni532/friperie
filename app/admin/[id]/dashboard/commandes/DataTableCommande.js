"use client"

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { PaginationPrevious, PaginationItem, PaginationLink, PaginationNext, PaginationContent, Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"


export default function DataTableCommande({ columns, commandes }) {
    // Etat pour rechercher par nom d'commande
    const [query, setQuery] = useState("");
    const [priceOrder, setPriceOrder] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    // État pour suivre l'index de la page actuelle
    const [currentPage, setCurrentPage] = useState(1);
    const commandesPerPage = 5;

    const handlePriceFilter = (order) => {
        setPriceOrder(order);
        setCurrentPage(1);
    };

    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        setCurrentPage(1);
    };


    const resetFilter = () => {
        setStatusFilter(null);
        setPriceOrder(null);
        setCurrentPage(1);
    }


    // Filtrer les commandes en fonction de la demande
    const filteredCommandes = commandes.filter(commande => {
        // Filtre de recherche
        if (query && !commande.idCommande.toString().toLowerCase().includes(query.toLowerCase())) {
            return false;
        }

        // Filtre de statut
        if (statusFilter && commande.statutCommande !== statusFilter) {
            return false;
        }

        return true;
    });

    // Filtre de prix
    if (priceOrder) {
        filteredCommandes.sort((a, b) => {
            if (priceOrder === 'asc') {
                return a.prixCommande - b.prixCommande;
            } else if (priceOrder === 'desc') {
                return b.prixCommande - a.prixCommande;
            }
            return 0;
        });
    }

    const indexOfLastCommande = currentPage * commandesPerPage;
    const indexOfFirstCommande = indexOfLastCommande - commandesPerPage;
    const currentCommandes = filteredCommandes.slice(indexOfFirstCommande, indexOfLastCommande);

    // Fonction pour changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold p-3">Commandes</h1>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <Input
                        className="flex-1 max-w-lg bg-gray-100 dark:bg-gray-800 border-none shadow-none mb-4 lg:mb-0"
                        placeholder="Chercher une commande .."
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
                                <FilterIcon className="w-4 h-4 mr-4" />
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
                                <FilterIcon className="w-4 h-4 mr-4" />
                                Filtrer par statut
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[200px]">
                            <DropdownMenuCheckboxItem onClick={() => handleStatusFilter("Payer")}>Payer</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem onClick={() => handleStatusFilter("En cours de livraison")}>En cours de livraison</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem onClick={() => handleStatusFilter("Livrer")}>Livrer</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {priceOrder || statusFilter ?
                        (
                            <Button size="sm" variant="outline" onClick={resetFilter}>
                                <FilterIcon className="w-4 h-4 mr-4" />
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
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentCommandes.map((commande, index) => (
                            <TableRow key={index}>
                                {columns.map(col => (
                                    <TableCell key={col.key}>
                                        {col.key === "prixCommande" ?
                                            commande[col.key]+".-"
                                            :
                                            commande[col.key]
                                        }
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Button size="icon" variant="ghost">
                                            <ImageUpIcon className="w-4 h-4" />
                                        </Button>
                                        <Button size="icon" variant="ghost">
                                            <TrashIcon className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between mt-6">
                <Pagination>
                    <PaginationContent>
                        <div className="flex items-center justify-between mt-6">
                            {filteredCommandes.length > 0 && (
                                <Pagination>
                                    <PaginationContent>
                                        {currentPage > 1 && (
                                            <PaginationItem>
                                                <PaginationPrevious href="#" onClick={() => paginate(currentPage - 1)} />
                                            </PaginationItem>
                                        )}
                                        {[...Array(Math.ceil(filteredCommandes.length / commandesPerPage)).keys()].map((pageNumber, index) => (
                                            <PaginationItem key={index}>
                                                <PaginationLink href="#" isActive={pageNumber + 1 === currentPage} onClick={() => paginate(pageNumber + 1)}>
                                                    {pageNumber + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                                        {currentPage < Math.ceil(filteredCommandes.length / commandesPerPage) && (
                                            <PaginationItem>
                                                <PaginationNext href="#" onClick={() => paginate(currentPage + 1)} />
                                            </PaginationItem>
                                        )}
                                    </PaginationContent>
                                </Pagination>
                            )}
                            {filteredCommandes.length === 0 && (
                                <TableRow>
                                    <p className="text-center text-gray-500">Aucun résultat trouvé.</p>
                                </TableRow>
                            )}
                        </div>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}

function FilterIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
    )
}

function ImageUpIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="blue"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
            <path d="m14 19.5 3-3 3 3" />
            <path d="M17 22v-5.5" />
            <circle cx="9" cy="9" r="2" />
        </svg>
    )
}


function TrashIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    )
}
