"use server"

import addDataWithId from "@/app/db/request/addDataWithId"
import getMultipleData from "@/app/db/request/getMultipleData"
import { revalidatePath } from "next/cache"

export const revalidate = async () => {
    return revalidatePath('/admin/[id]/dashboard', 'page')
}

export async function getData(path) {
    const { resultGetMultipleData } = await getMultipleData(path);

    return resultGetMultipleData;
}

export async function addArticle(lastId, articleData){
    const idArticle = lastId + 1;

    const article = {...articleData, idArticle};

    await addDataWithId("article", idArticle.toString(), article);
}