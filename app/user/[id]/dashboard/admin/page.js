import getMultipleData from "@/app/db/request/getMultipleData"
import columns from "./articles/columns"
import DataTable from "./articles/data-table"

export async function getData() {
    const data = [];
    const { resultGetMultipleData } = await getMultipleData("article");

    resultGetMultipleData.map(article => 
        data.push(article.data)
    )
    return data;
}

const Page = async () => {
    const data = await getData();
    return (
        <div className="container mx-auto py-10">
            <p>coucou</p>
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default Page;