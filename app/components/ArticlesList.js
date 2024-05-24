import { getData } from "../action/action";
import CardArticle from "./CardArticle";

export async function getArticles() {
  const result = await getData("article");
  return result.filter(article => article.statut === "En vente");
}

export default async function ArticlesList({ sortArticles }) {
  const articles = await getArticles();

  const sortedArticles = sortArticles(articles);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedArticles.map((article) => (
        <CardArticle key={article.idArticle} article={article} />
      ))}
    </div>
  );
}
