import { createBrowserRouter, RouterProvider } from "react-router-dom"
import AuthLayout from "./modules/Shared/Components/AuthLayout/AuthLayout"
import NotFound from "./modules/Shared/Components/NotFound/NotFound"
import Login from "./modules/AuthModule/Components/Login/Login"
import Register from "./modules/AuthModule/Components/Register/Register"
import ForgotPassword from "./modules/AuthModule/Components/ForgotPassword/ForgotPassword"
import ResetPassword from "./modules/AuthModule/Components/ResetPassword/ResetPassword"
import MasterLayout from "./modules/Shared/Components/MasterLayout/MasterLayout"
import Dashboard from "./modules/Dashboard/Components/Dashboard/Dashboard"
import RecipesList from "./modules/Recipes/Components/RecipesList/RecipesList"
import RecipeData from "./modules/Recipes/Components/RecipeData/RecipeData"
import CategoriesList from "./modules/Categories/Components/CategoriesList/CategoriesList"
import CategoryData from "./modules/Categories/Components/CategoryData/CategoryData"
import UsersList from "./modules/Users/Components/UsersList/UsersList"
import FavoritesList from "./modules/Favorites/FavoritesList/FavoritesList"
import Verify from "./modules/AuthModule/Components/Verify/Verify"




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
       {path:'verify-account', element: <Verify/>},
    ]},
    {
      path:"/dashboard",
      element: <MasterLayout/>,
      errorElement: <NotFound/>,
      children:[
        {index: true, element:<Dashboard/>},
        {path: 'recipes', element:<RecipesList/>},
        {path: 'recipes-data', element:<RecipeData/>},
        {path: 'categories', element:<CategoriesList/>},
        {path: 'category-data', element:<CategoryData/>},
        {path: 'users', element:<UsersList/>},
        {path: 'favorites', element:<FavoritesList/>},

      ]
    }
  ])

  return <RouterProvider router={routes} />
}

export default App
