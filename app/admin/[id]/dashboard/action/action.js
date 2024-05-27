"use server"

import addDataWithId from "@/app/db/request/addDataWithId";
import { revalidatePath } from "next/cache";

export const revalidate = async () => {
    return revalidatePath('/', 'page')
}

export const revalidateUser = async (id) => {
    return revalidatePath(`/user/${id}/profile`, 'page')
}

export async function addArticle(idArticle, articleData){
    await addDataWithId("article", idArticle.toString(), articleData);
    revalidate();
}