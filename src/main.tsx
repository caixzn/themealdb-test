import React from 'react'
import ReactDOM from 'react-dom/client'
import { App, FullRecipe, Home, RecipeList, SearchByFirstLetter, SearchByIngredient, SearchByName } from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import ErrorPage from './error-page.tsx'

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
      },
      {
        path: "nome/:name",
        element: <SearchByName />,
      },
      {
        path: "primeira_letra",
        element: <SearchByFirstLetter />,
      },
      {
        path: "primeira_letra/:letter",
        element: <RecipeList />,
      },
      {
        path: "igrediente_principal",
        element: <SearchByIngredient />,
      },
      {
        path: "igrediente_principal/:ingredient",
        element: <SearchByIngredient />,
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
