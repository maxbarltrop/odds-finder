import {
  collection,
  addDoc,
  getFirestore,
  query,
  where,
  limit,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import "firebase/compat/firestore";

export const getFavorites = async (user) => {
  const userFavoritesQuery = query(
    collection(getFirestore(), "favorites"),
    where("user_key", "==", user.uid),
    limit(20)
  );
  const snap = await getDocs(userFavoritesQuery);
  return snap.docs.map((s) => s.data());
};

export const addFavorite = async (user, fav) => {
  const firestore = getFirestore();
  const favoritesCollection = collection(firestore, "favorites");
  const newDoc = await addDoc(favoritesCollection, {
    competition_key: fav.competition_key,
    team_key: fav.team_key,
    user_key: user.uid,
    name: fav.name,
  });
  return newDoc ? true : null;
};

export const deleteFavorite = async (fav) => {
  const userFavoritesQuery = query(
    collection(getFirestore(), "favorites"),
    where("user_key", "==", fav.user_key),
    where("team_key", "==", fav.team_key)
  );
  const snap = await getDocs(userFavoritesQuery);
  snap.docs.forEach((doc) => deleteDoc(doc.ref));
  return true;
};
