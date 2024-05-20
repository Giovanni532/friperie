"use server"

import getMultipleData from "../db/request/getMultipleData";

export async function getData(path) {
    const { resultGetMultipleData } = await getMultipleData(path);

    return resultGetMultipleData;
}