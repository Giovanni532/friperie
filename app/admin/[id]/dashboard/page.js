import { getData } from "./action/action";
import ToggleDisplay from "./components/ToggleDisplay";


const Page = async () => {
    const articlesNotSorted = await getData("article");
    const commandesNotSorted = await getData("commande");
    const articlesSorted = articlesNotSorted.sort((a, b) => a.idArticle - b.idArticle)
    const commandesSorted = commandesNotSorted.sort((a, b) => a.idCommande - b.idCommande)

    return (
        <ToggleDisplay articles={articlesSorted} commandes={commandesSorted} />
    );
};

export default Page;
