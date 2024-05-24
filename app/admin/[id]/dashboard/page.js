import { getMonthlyNewUsers, getSalesData } from "@/app/db/utils/adminData";
import ToggleDisplay from "./components/ToggleDisplay";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { RxArrowUp } from "react-icons/rx";
import { getData } from "@/app/action/action";


const AdminDashboard = async () => {
    const articlesNotSorted = await getData("article");
    const commandesNotSorted = await getData("commande");
    const articlesSorted = articlesNotSorted.sort((a, b) => a.idArticle - b.idArticle)
    const commandesSorted = commandesNotSorted.sort((a, b) => a.idCommande - b.idCommande)
    const { totalOrders, totalRevenue, totalSales } = await getSalesData();
    const newUser = await getMonthlyNewUsers();

    return (
        <main className="flex-1 p-4 md:p-10 my-20">
            <div className="grid gap-6 md:gap-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle>Total de livraison</CardTitle>
                            <CardDescription>Vous avez livrée {totalSales} articles durant ce mois.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-4xl font-bold text-green-500">
                                    {totalSales}
                                    <RxArrowUp className="h-6 w-6"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle>Revenue total</CardTitle>
                            <CardDescription>Vous avez fais un bénéfices de {totalRevenue}$ durant ce mois.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-4xl font-bold text-green-500">
                                    {totalRevenue}$
                                    <RxArrowUp className="h-6 w-6"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle>Commande total</CardTitle>
                            <CardDescription>Vous avez eu {totalOrders} commandes durant ce mois.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-4xl font-bold text-green-500">
                                    {totalOrders}
                                    <RxArrowUp className="h-6 w-6"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle>Nouveaux clients</CardTitle>
                            <CardDescription>Vous avez eu {newUser} nouveau clients durant ce mois.</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-4xl font-bold text-green-500">
                                    {newUser}
                                    <RxArrowUp className="h-6 w-6"/>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <ToggleDisplay articles={articlesSorted} commandes={commandesSorted} />
        </main>
    );
};

export default AdminDashboard;