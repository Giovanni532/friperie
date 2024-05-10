import { getData } from "./action/action";
import columns from "./articles/columns";
import DataTable from "./articles/data-table";


const Page = async () => {
    const article= await getData("article");
 
    return (
        <div className="container mx-auto py-10 ">
            <DataTable columns={columns} data={article} />
        </div>
    );
};

export default Page;
