import { getData } from "./action/action";
import ColumnsArticle from "./articles/ColumnsArticle";
import DataTableArticle from "./articles/DataTableArticle";
import ModalArticle from "./components/ModalArticle";


const Page = async () => {
    const articles = await getData("article");

    return (
        <div className="container mx-auto py-10 ">
            <h1>Page admin</h1>
            <ModalArticle/>
            <DataTableArticle columns={ColumnsArticle} articles={articles}/>
        </div>
    );
};

export default Page;
