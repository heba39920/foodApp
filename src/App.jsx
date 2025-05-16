import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayout from "./modules/Shared/Components/AuthLayout/AuthLayout"
import NotFound from "./modules/Shared/Components/NotFound/NotFound"
import Login from "./modules/AuthModule/Components/Login/Login"
import Register from "./modules/AuthModule/Components/Register/Register"
import ForgotPassword from "./modules/AuthModule/Components/ForgotPassword/ForgotPassword"
import ResetPassword from "./modules/AuthModule/Components/ResetPassword/ResetPassword"
import MasterLayout from "./modules/Shared/Components/MasterLayout/MasterLayout"
import RecipesList from "./modules/AdminModule/Components/Recipes/RecipesList/RecipesList"
import ViewRecipeDetails from "./modules/Shared/Components/ViewRecipeDetails/ViewRecipeDetails"
import UpdateRecipe from "./modules/AdminModule/Components/Recipes/UpdateRecipe/UpdateRecipe"
import AddRecipe from "./modules/AdminModule/Components/Recipes/AddRecipe/AddRecipe"
import CategoriesList from "./modules/AdminModule/Components/Categories/CategoriesList/CategoriesList"
import FavoriteRecipes from "./modules/UserModule/Components/FavoriteRecipes/FavoriteRecipes"
import UserRecipes from "./modules/UserModule/Components/UserRecipes/UserRecipes"




function App() {
  const routes = createBrowserRouter([
    {path: '/', element: <AuthLayout/>,
    errorElement: <NotFound/>,
    children:[
      {index: true, element: <Login/>},
      {path: 'login', element: <Login/>},
      {path: 'register', element: <Register/>},
      {path:'forgot-password', element: <ForgotPassword/>},
      {path:'reset-password', element: <ResetPassword/>},
    ]},
    {
      path:"/dashboard",
      element: <MasterLayout/>,
      errorElement: <NotFound/>,
      children:[
        {index: true, element:<RecipesList/>},
        {path: 'recipes', element:<RecipesList/>},
        {path: 'recipes/:id', element:<ViewRecipeDetails/>},
        {path: 'recipes/:id/update', element:<UpdateRecipe/>},
        {path: 'add', element:<AddRecipe/>},
        {path: 'categories', element:<CategoriesList/>},
        {path: 'favorite', element:<FavoriteRecipes/>},

      ]
    }
  ])

  return <RouterProvider router={routes} />
}

export default App
