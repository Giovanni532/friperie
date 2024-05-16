import { getData } from "./action/action";
import ColumnsArticle from "./articles/ColumnsArticle";
import DataTableArticle from "./articles/DataTableArticle";
import ModalArticle from "./components/ModalArticle";


const Page = async () => {
    const articlesNotSorted = await getData("article");
    const articlesSorted = articlesNotSorted.sort((a, b) => a.idArticle - b.idArticle)

    return (
        <div className="container mx-auto py-10 ">
            <ModalArticle/>
            <DataTableArticle columns={ColumnsArticle} articles={articlesSorted}/>
        </div>
    );
};

export default Page;
