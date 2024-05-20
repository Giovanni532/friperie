"use server"

import addDataWithId from "@/app/db/request/addDataWithId";
import getMultipleData from "@/app/db/request/getMultipleData";
import { revalidatePath } from "next/cache";

export const revalidate = async () => {
    return revalidatePath('/', 'page')
}

export async function addArticle(idArticle, articleData){
    await addDataWithId("article", idArticle.toString(), articleData);
    revalidate();
}