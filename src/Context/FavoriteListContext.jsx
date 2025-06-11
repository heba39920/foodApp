import { createContext, useContext, useEffect, useState } from "react"
import { axiosInstance, USER_RECIPE_URLS } from "../Constants/CONTENT-END-POINTS"
const FavoriteListContext = createContext();
export function FavoriteListContextProvider({ children }) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllUserRecipes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(USER_RECIPE_URLS.getAllUserRecipes);
      // Ensure the response.data.data is the expected list of recipes
      setFavoriteRecipes(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user recipes when the component mounts or when userData changes
   useEffect(() => {
      getAllUserRecipes();
  }, []);


  return (
    <FavoriteListContext.Provider
      value={{ favoriteRecipes, loading, error, getAllUserRecipes }}
    >
      {children}
    </FavoriteListContext.Provider>
  );
}
const useFavListContext = () => {
  const context = useContext(FavoriteListContext);
  if (!context) {
    throw new Error("useFavListContext must be used within a FavoriteListContextProvider");
  }
  return context;
};

export default useFavListContext;