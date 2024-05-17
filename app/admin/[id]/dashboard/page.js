import { getData } from "./action/action";
import ToggleDisplay from "./components/ToggleDisplay";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"


const Page = async () => {
    const articlesNotSorted = await getData("article");
    const commandesNotSorted = await getData("commande");
    const articlesSorted = articlesNotSorted.sort((a, b) => a.idArticle - b.idArticle)
    const commandesSorted = commandesNotSorted.sort((a, b) => a.idCommande - b.idCommande)

    return (
        <main className="flex-1 p-4 md:p-10">
            <div className="grid gap-6 md:gap-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle>Total de ventes</CardTitle>
                            <CardDescription>$120,000 in the last 30 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <div className="text-4xl font-bold">$120,000</div>
                                <div className="flex items-center gap-1 text-green-500">
                                    <ArrowUpIcon className="h-4 w-4" />
                                    <span>12%</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle>Revenue total</CardTitle>
                            <CardDescription>$80,000 in the last 30 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <div className="text-4xl font-bold">$80,000</div>
                                <div className="flex items-center gap-1 text-green-500">
                                    <ArrowUpIcon className="h-4 w-4" />
                                    <span>8%</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle>Commande total</CardTitle>
                            <CardDescription>1,200 orders in the last 30 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <div className="text-4xl font-bold">1,200</div>
                                <div className="flex items-center gap-1 text-green-500">
                                    <ArrowUpIcon className="h-4 w-4" />
                                    <span>15%</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle>Nouveaux utilisateurs</CardTitle>
                            <CardDescription>300 new customers in the last 30 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <div className="text-4xl font-bold">300</div>
                                <div className="flex items-center gap-1 text-green-500">
                                    <ArrowUpIcon className="h-4 w-4" />
                                    <span>20%</span>
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

export default Page;

function ArrowUpIcon(props) {
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
        <path d="m5 12 7-7 7 7" />
        <path d="M12 19V5" />
      </svg>
    )
  }