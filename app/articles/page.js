"use server"

import { getData } from "../action/action";
import ArticlesData from "./components/ArticlesData";

export async function getArticles() {
  const result = await getData("article")
  return result
}



export default async function Articles() {
  const articles = await getArticles();

  return <ArticlesData articles={articles}/>
}
