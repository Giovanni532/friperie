"use server"

import getMultipleData from "../db/request/getMultipleData";

import { revalidatePath } from "next/cache";

export const revalidateWebSite = async () => {
    return revalidatePath('/', 'page')
}


export async function getData(path) {
    const { resultGetMultipleData } = await getMultipleData(path);

    return resultGetMultipleData;
}