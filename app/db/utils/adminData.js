import getMultipleData from "../request/getMultipleData";

// Helper function to get the start and end of the week
// Helper function to get the start and end of the month
const getStartAndEndOfMonth = () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  startOfMonth.setHours(0, 0, 0, 0);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);
  return { startOfMonth, endOfMonth };
};

// Fonction pour récupérer les bénéfices générés depuis le début du mois
export const getSalesData = async () => {
  const salesRef = (await getMultipleData("commande")).resultGetMultipleData;
  const { startOfMonth, endOfMonth } = getStartAndEndOfMonth();

  let totalSales = 0;
  let totalRevenue = 0;
  let totalOrders = 0;

  salesRef.forEach((doc) => {
    const data = doc;
    const date = new Date(data.createdAt); // La date est directement convertie en objet Date
    if (date >= startOfMonth && date <= endOfMonth) {
      if(data.statutCommande === "Livrée"){
        totalSales += 1;
      }
      totalRevenue += data.prixCommande;
    }
    totalOrders += 1;
  });

  return { totalSales, totalRevenue, totalOrders };
};

// Fonction pour récupérer les utilisateurs inscrits depuis le début du mois
export const getMonthlyNewUsers = async () => {
  const usersRef = await getMultipleData("user");
  const { startOfMonth, endOfMonth } = getStartAndEndOfMonth();

  const newUsers = usersRef.resultGetMultipleData.filter((doc) => {
    const data = doc;
    const createdAt = new Date(data.createdAt);
    return createdAt >= startOfMonth && createdAt <= endOfMonth;
  });

  return newUsers.length;
};
