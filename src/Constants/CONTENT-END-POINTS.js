import axios from "axios";

const BASE_URL = "https://upskilling-egypt.com:3006";
export const BASE_IMAGE_URL = "https://upskilling-egypt.com:3006/";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
   
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
  (error) => {
    return Promise.reject(error);
  })
// recipes
const BASE_RECIPE_URL = `${BASE_URL}/api/v1/Recipe`;
export const RECIPE_URLS = {
    getAllRecipes: `${BASE_RECIPE_URL}/?pageSize=10&pageNumber=1`,
    getRecipeById: (id) => `${BASE_RECIPE_URL}/${id}`,
    addRecipe: `${BASE_RECIPE_URL}/`,
    updateRecipe: (id) => `${BASE_RECIPE_URL}/${id}`,
  
    
    deleteRecipe: (id) => `${BASE_RECIPE_URL}/${id}`,

} 

//
// categories
const BASE_CATEGORY_URL = `${BASE_URL}/api/v1/Category`;
export const CATEGORY_URLS = {
    getAllCategories: BASE_CATEGORY_URL,
    getCategoryById: (id) => `${BASE_CATEGORY_URL}/${id}`,
    addCategory: `${BASE_CATEGORY_URL}/`,
    updateCategory: (id) => `${BASE_CATEGORY_URL}/${id}`,
    deleteCategory: (id) => `${BASE_CATEGORY_URL}/${id}`,

};
//tags 
export const TAGS_URL = {
  getAllTags:`${BASE_URL}/api/v1/tag/`
};