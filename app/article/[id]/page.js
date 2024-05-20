import getDataWithId from '@/app/db/request/getData'
import React from 'react'
import DetailView from './components/DetailView'

export async function getArticle(id) {
    const {resultGetData} = await getDataWithId("article", id.toString())
    return resultGetData.data()
  }

export default async function ArticleDetail({params}) {
    const article = await getArticle(params.id)
  return (
    <DetailView article={article}/>
  )
}
