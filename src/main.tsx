import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, FilterableIngredientList, Home, SearchByFirstLetter, SearchByIngredient, SearchByName } from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import ErrorPage from './error-page.tsx'
import { FullRecipe, RecipeList } from './components/recipe.tsx'
import { IngredientLoader, RecipeLoader } from './api/fetch.ts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: "nome",
        element: <SearchByName />,
        children: [
          {
            path: "",
            element: <RecipeList />,
          },
          {
            path: ":name",
            element: <RecipeList />,
            loader: RecipeLoader,
          }
        ]
      },
      {
        path: "primeira_letra",
        element: <SearchByFirstLetter />,
        children: [
          {
            path: "",
            element: <RecipeList />,
          },
          {
            path: ":letter",
            element: <RecipeList />,
            loader: RecipeLoader,
          }
        ]
      },
      {
        path: "igrediente_principal",
        element: <SearchByIngredient />,
        children: [
          {
            path: "",
            element: <FilterableIngredientList />,
            loader: IngredientLoader
          },
          {
            path: ":ingredient",
            element: <RecipeList />,
            loader: RecipeLoader,
          }
        ]
      },
      {
        path: "id/:id",
        element: <FullRecipe />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
