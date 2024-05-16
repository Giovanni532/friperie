import { getFirestore, getDocs, collection } from 'firebase/firestore';
import firebaseDb from '../config';

const db = getFirestore(firebaseDb)

async function getArticles() {
  const querySnapshot = await getDocs(collection(db, "article"));
  const result = querySnapshot.docs.map(doc => ({
    id: doc.idArticle,
    ...doc.data(),
  }));
  return { result };
}

export default async function getNextArticleId() {
    const articles = (await getArticles()).result;
    
    if (articles.length === 0) {
      return 1; // Si aucun article, retournez 1 comme premier ID
    }
  
    // Convertir les IDs en nombres et trier
    const sortedArticles = articles.sort((a, b) => a.id - b.id);
    const lastArticle = sortedArticles[sortedArticles.length - 1];
  
    // Récupérer le prochain ID
    const idArticle = lastArticle.idArticle + 1;
    return idArticle;
  }
  