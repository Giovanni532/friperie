import { getFirestore, getDocs, collection } from 'firebase/firestore';
import firebaseDb from '../config';

const db = getFirestore(firebaseDb)

async function getArticles() {
  const querySnapshot = await getDocs(collection(db, "article"));
  const result = querySnapshot.docs.map(doc => ({
    ...doc.data(),
  }));
  return { result };
}

async function getCommandes() {
  const querySnapshot = await getDocs(collection(db, "commande"));
  const result = querySnapshot.docs.map(doc => ({
    ...doc.data(),
  }));
  return { result };
}

export async function getNextArticleId() {
    const articles = (await getArticles()).result;
    
    if (articles.length === 0) {
      return 1; // Si aucun article, retournez 1 comme premier ID
    }
  
    // Convertir les IDs en nombres et trier
    const sortedArticles = articles.sort((a, b) => a.idArticle - b.idArticle);
    const lastArticle = sortedArticles[sortedArticles.length - 1];
  
    // Récupérer le prochain ID
    const idArticle = lastArticle.idArticle + 1;
    return idArticle;
  }

  export async function getNextCommandeId() {
    const commandes = (await getCommandes()).result;
    
    if (commandes.length === 0) {
      return 1; // Si aucun article, retournez 1 comme premier ID
    }
  
    // Convertir les IDs en nombres et trier
    const sortedCommandes = commandes.sort((a, b) => a.idCommande - b.idCommande);
    const lastCommande = sortedCommandes[sortedCommandes.length - 1];
  
    // Récupérer le prochain ID
    const idCommande = lastCommande.idCommande + 1;
    return idCommande;
  }
  