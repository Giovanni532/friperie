import getMultipleData from "../request/getMultipleData";

// Helper function to get the start and end of the week
const getStartAndEndOfWeek = () => {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
  endOfWeek.setHours(23, 59, 59, 999);
  return { startOfWeek, endOfWeek };
};


// Fonction pour récupérer les bénéfices générés depuis le début de la semaine
export const getSalesData = async () => {
  const salesRef = (await getMultipleData("commande")).resultGetMultipleData;
  const { startOfWeek, endOfWeek } = getStartAndEndOfWeek();

  let totalSales = 0;
  let totalRevenue = 0;
  let totalOrders = 0;

  salesRef.forEach((doc) => {
    const data = doc;
    const date = new Date(data.createdAt); // La date est directement convertie en objet Date
    if (date >= startOfWeek && date <= endOfWeek) {
      if(data.statutCommande === "Livrée"){
        totalSales += 1;
      }
      totalRevenue += data.prixCommande;
    }
    totalOrders += 1;
  });

  return { totalSales, totalRevenue, totalOrders };
};

// Fonction pour récupérer les utilisateurs inscrits depuis le début de la semaine
export const getWeeklyNewUsers = async () => {
  const usersRef = await getMultipleData("user");
  const { startOfWeek, endOfWeek } = getStartAndEndOfWeek();

  const newUsers = usersRef.resultGetMultipleData.filter((doc) => {
    const data = doc;
    const createdAt = new Date(data.createdAt);
    return createdAt >= startOfWeek && createdAt <= endOfWeek;
  });

  return newUsers.length;
};