import { useEffect, useState } from 'react';
import { Link, Outlet, useLoaderData, useLocation } from 'react-router-dom';
import { SearchBar } from './components/search-bar';
import { IngredientList } from './components/ingredient';
import { FullRecipe } from './components/recipe';
import { Sidebar } from './components/sidebar';
import { getRecipeRandom } from './api/fetch';

export function App() {
  return (
    <div className="flex flex-col md:flex-row md:min-h-screen">
      <aside className="flex-shrink-0 p-4 md:w-56 bg-zinc-950">
        <Sidebar />
      </aside>
      <main className="flex-grow m-5">
        <Outlet />
      </main>
    </div>
  )
}

export function Home() {
  const [recipe, setRecipe] = useState<Recipe>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecipeRandom()
      .then(r => setRecipe(r))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return "...";
  }
  if (!recipe) {
    return "Erro ao carregar receita!";
  }

  return (
    <>
      <h1 className="mb-4 text-4xl">receita aleatória:</h1>
      <FullRecipe recipe={recipe} />
    </>
  )
}

export function SearchByIngredient() {
  const [ingredient] = useLocation().pathname.split('/').slice(-1);

  return (
    <>
      <h1 className="mb-4 text-4xl">igrediente principal{`: ${ingredient.replace(/_/g, ' ')}` ?? ''}</h1>
      <Outlet />
    </>
  )
}

export function FilterableIngredientList() {
  const [filterText, setFilterText] = useState('');

  const ingredients = useLoaderData() as Ingredient[];

  return (
    <>
      <SearchBar text={filterText} onTextChange={setFilterText} />
      <IngredientList ingredients={ingredients} filterText={filterText} />
    </>
  )
}

export function SearchByName() {
  const [text, setText] = useState('');

  return (
    <>
      <h1 className="mb-4 text-4xl">nome</h1>
      <SearchBar text={text} onTextChange={setText} />
      <Outlet />
    </>
  )
}

export function SearchByFirstLetter() {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  return (
    <>
      <h1 className="mb-4 text-4xl">primeira letra</h1>
      <div className="flex flex-wrap max-w-screen-md mt-6">
        {
          alphabet.map((letter) =>
          (<Link key={letter} className="gap-2 px-1 pt-2 m-2 text-2xl text-center transition ease-in-out rounded-sm cursor-pointer w-14 aspect-square hover:bg-zinc-300 hover:text-stone-800" to={`${letter}`}>
            {letter}
          </Link>)
          )
        }
      </div>
      <Outlet />
    </>
  )
}
