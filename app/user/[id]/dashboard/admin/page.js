import getMultipleData from "@/app/db/request/getMultipleData";
import columns from "./articles/columns";
import DataTable from "./articles/data-table";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function getData() {
    const data = [];
    const { resultGetMultipleData } = await getMultipleData("article");

    resultGetMultipleData.map((article) => data.push(article.data));
    return data;
}

const Page = async () => {
    const data = await getData();
    const admin = getCookie("admin", { cookies });

    if (admin === "false") {
        return (
            <div>
                <h1>Ooppss</h1>
                <p>Il semblerait que cette page n'existe pas !</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 ">
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default Page;
