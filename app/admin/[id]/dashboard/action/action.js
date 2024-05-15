"use server"

import getMultipleData from "@/app/db/request/getMultipleData"
import { revalidatePath } from "next/cache"

export const revalidate = async () => {
    return revalidatePath('/admin/[id]/dashboard', 'page')
}

export async function getData(path) {
    const { resultGetMultipleData } = await getMultipleData(path);

    return resultGetMultipleData;
}