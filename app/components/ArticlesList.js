import { useEffect, useState } from "react";
import { getData } from "../action/action";
import CardArticle from "./CardArticle";
import SkeletonCardList from "./SkeletonCardList";

async function fetchArticles() {
  const result = await getData("article");
  return result.filter(article => article.statut === "En vente");
}

export default function ArticlesList({ sortArticles }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      const fetchedArticles = await fetchArticles();
      setArticles(fetchedArticles);
      setLoading(false);
    }

    loadArticles();
  }, []);

  if (loading) {
    return <SkeletonCardList />;
  }

  const sortedArticles = sortArticles(articles);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedArticles.map((article) => (
        <CardArticle key={article.idArticle} article={article} />
      ))}
    </div>
  );
}
