import { getData } from "./action/action";
import ColumnsArticle from "./articles/ColumnsArticle";
import DataTableArticle from "./articles/DataTableArticle";


const Page = async () => {
    const article= await getData("article");

    return (
        <div className="container mx-auto py-10 ">
            <h1>Page admin</h1>
            <DataTableArticle columns={ColumnsArticle} data={article}/>
        </div>
    );
};

export default Page;
