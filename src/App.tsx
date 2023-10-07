import { useEffect, useState } from 'react';
import { Link, Outlet, useLoaderData, useLocation } from 'react-router-dom';
import { SearchBar } from './components/search-bar';
import { IngredientList } from './components/ingredient';
import { FullRecipe } from './components/recipe';
import { Sidebar } from './components/sidebar';

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

async function getRecipeById(id: string) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  if (response.ok) {
    const data = await response.json();
    return data.meals[0];
  }
  return null;
}

async function getRecipeRandom() {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
  if (response.ok) {
    const data = await response.json();
    return data.meals[0];
  }
  return null;
}

async function getRecipeByIngredient(ingredient: string) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  if (response.ok) {
    const data = await response.json();
    return data.meals;
  }
  return null;
}

async function getRecipeByName(name: string) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  if (response.ok) {
    const data = await response.json();
    return data.meals;
  }
  return null;
}

async function getRecipeByLetter(letter: string) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  if (response.ok) {
    const data = await response.json();
    return data.meals;
  }
  return null;
}

export async function RecipeLoader({ params }: any) {
  let recipe: Recipe[] | Recipe;
  switch (true) {
    case params.id !== undefined:
      recipe = await getRecipeById(params.id);
      break;
    case params.name !== undefined:
      recipe = await getRecipeByName(params.name);
      break;
    case params.letter !== undefined:
      recipe = await getRecipeByLetter(params.letter);
      break;
    case params.ingredient !== undefined:
      recipe = await getRecipeByIngredient(params.ingredient);
      break;
    default:
      recipe = await getRecipeRandom();
  }
  return recipe;
}

async function getIngredients() {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Erro ao carregar ingredientes!");
  }
}

export function Home() {
  const [recipe, setRecipe] = useState<Recipe>(null);
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

export async function IngredientLoader() {
  const { meals } = await getIngredients();
  return meals;
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
