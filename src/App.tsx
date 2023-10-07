import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

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

function Sidebar() {
  const items = ['nome', 'primeira letra', 'igrediente principal'];

  return (
    <>
      <h2 className="mt-2 mb-6 text-xl font-bold"><a href="/">busca de receitas</a></h2>
      <p className="mb-2 text-sm text-zinc-300">buscar por...</p>
      <ul className="flex flex-col gap-2">
        {items.map((item) => <SidebarItem key={item.replace(' ', '_')} name={item} />)}
      </ul>
    </>
  )
}

function SidebarItem({ name }: { name: string }) {
  return (
    <Link className="relative flex items-center w-full gap-2 py-1 pl-2 transition ease-in-out rounded-sm cursor-pointer hover:bg-zinc-300 hover:text-stone-800" to={name.replace(' ', '_')}>
        {name}
      </Link>
  )
}

export function Home() {
  return (
    <>
      <h1 className="mb-4 text-4xl">receita aleatória:</h1>
      <FullRecipe />
    </>
  )
}

export function SearchBar({ text, onTextChange, onClick, placeholder }: { text: string; onTextChange: (text: string) => void; onClick?: () => void; placeholder?: string; }) {
  return (
    <div className="flex gap-2">
      <input
        className="flex-grow max-w-lg p-2 my-2 rounded-sm bg-zinc-950 text-stone-200"
        type="text"
        value={text}
        placeholder={placeholder}
        onChange={(e) => onTextChange(e.target.value)} />

      {onClick !== undefined ?
        (<button
          className="relative self-center w-24 p-2 transition ease-in-out rounded-sm bg-zinc-950 hover:bg-zinc-300 hover:text-stone-800"
          onClick={onClick}
        >
          buscar
        </button>) : null
      }

    </div>
  );
}

export function SearchByIngredient() {
  const ingredients = INGREDIENTS;
  const [filterText, setFilterText] = useState('');

  return (
    <>
      <h1 className="mb-4 text-4xl">igrediente principal</h1>
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
      <SearchBar text={text} onTextChange={setText} onClick={() => { }} />
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
    </>
  )
}

export function RecipeList() {
  const recipes = RECEITAS;

  return (
    <div className="flex flex-wrap gap-4 my-6">
      {recipes.map((recipe) => (<RecipeCard key={recipe.idMeal} recipe={recipe} />))}
    </div>
  )
}

export function FullRecipe() {
  const recipe = RECEITAS[0];

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && measure) {
      ingredients.push(`${ingredient} - ${measure}`);
    } else if (ingredient) {
      ingredients.push(ingredient);
    }
  }

  return (
    <div className="m-auto max-w-max">
      <h1 className="mb-4 font-serif text-6xl text-center">{recipe.strMeal}</h1>
      {
        recipe.strArea ?
          <h2 className="mb-2 text-lg text-center text-zinc-200">{recipe.strArea}</h2>
          : null
      }
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <hr className="h-px my-6 border-0 bg-zinc-50" />
      <div className="max-w-prose">
        <h2 className="mb-2 font-serif text-2xl text-zinc-50">igredientes</h2>
        <ul className="mb-6 list-disc list-inside">
          {
            ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)
          }
        </ul>
        <h2 className="mb-2 font-serif text-2xl text-zinc-50">instruções</h2>
        <ol className="mb-6 list-decimal list-inside marker:text-zinc-400">
          {recipe.strInstructions.split('\r\n').map((paragraph, index) => <li key={index}>{paragraph}</li>)}
        </ol>
      </div>
    </div>
  )
}

export function IngredientList({ ingredients, filterText }: { ingredients?: Ingredient[], filterText?: string; }) {
  if (!ingredients) {
    ingredients = INGREDIENTS;
  }

  return (
    <div className="flex flex-col flex-wrap gap-4 my-6 max-w-fit">
      {
        ingredients
          .filter((ingredient) => filterText ? ingredient.strIngredient.toLowerCase().includes(filterText.toLowerCase()) : true)
          .map((ingredient) => <IngredientButton key={ingredient.idIngredient} ingredientName={ingredient.strIngredient} ingredientId={ingredient.idIngredient} />)
      }
    </div>
  )
}

export function IngredientButton({ ingredientName, ingredientId }: { ingredientName: string; ingredientId: string; }) {
  return (
    <Link className="gap-2 px-4 py-1 transition ease-in-out rounded-sm cursor-pointer hover:bg-zinc-300 hover:text-stone-800" to={`${ingredientId}`}>
      {ingredientName}
    </Link>
  )
}

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const tags = [
    recipe?.strArea,
    recipe?.strCategory,
    ...(recipe?.strTags?.split(',') || []),
  ]

  return (
    <div className="overflow-hidden rounded shadow-lg w-80 bg-zinc-950">
      {
        recipe?.strMealThumb
          ? <img className="w-full aspect-square" src={recipe?.strMealThumb} alt={recipe?.strMeal} />
          : <div className="w-full p-12 text-center aspect-square bg-zinc-800">sem foto</div>
      }
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{recipe?.strMeal}</div>
        <p className="text-base text-stone-200 line-clamp-5">
          {recipe?.strInstructions}
        </p>
        <Link className="text-zinc-400" to={`/id/${recipe?.idMeal}`}>
          ver receita completa
        </Link>
      </div>
      <div className="max-w-xs px-6 py-4 truncate">
        <a href={recipe?.strYoutube ?? undefined} className="text-zinc-400">
          ver receita no YouTube
        </a>
      </div>
      <div className="px-6 pt-4 pb-2">
        {
          tags.map((tag) => <span key={tag} className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold rounded-full text-stone-200 bg-zinc-900">{tag}</span>)
        }
      </div>
    </div>
  )
}

type Recipe = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string | null;
  strMealThumb: string | null;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
} & Record<`${'strMeasure' | 'strIngredient'}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20}`, string | null>;

type Ingredient = {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}

