import { Link, useLoaderData } from "react-router-dom";

export function FullRecipe({ recipe }: { recipe?: Recipe }) {
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
      <h1 className="mb-4 font-serif text-6xl text-center">{recipe?.strMeal}</h1>
      {
        recipe?.strArea ?
          <h2 className="mb-2 text-lg text-center text-zinc-200">{recipe.strArea}</h2>
          : null
      }
      <img src={recipe?.strMealThumb ?? undefined} alt={recipe?.strMeal} />
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
          {recipe?.strInstructions?.split('\r\n')
            .filter((paragraph) => paragraph !== '')
            .map((paragraph, index) => <li key={index}>{paragraph}</li>)}
        </ol>
      </div>
    </div>
  )
}

export function RecipeList({ recipes }: { recipes?: Recipe[]}) {
  if (recipes) {
    return (
      <div className="flex flex-wrap gap-4 my-6">
        {recipes.map((recipe) => (<RecipeCard key={recipe.idMeal} recipe={recipe} />))}
      </div>
    )
  }

  const data = useLoaderData() as Recipe[];
  console.log(data);
  return (
    <div className="flex flex-wrap gap-4 my-6">
      {data.map((recipe) => (<RecipeCard key={recipe.idMeal} recipe={recipe} />))}
    </div>
  )
}

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const tags = [
    recipe?.strArea,
    recipe?.strCategory,
    ...(recipe?.strTags?.split(',') || []),
  ].filter((tag) => tag !== null && tag !== undefined && tag !== '');

  return (
    <div className="overflow-hidden rounded shadow-lg w-80 bg-zinc-950">
      {
        recipe?.strMealThumb
          ? <img className="w-full aspect-square" src={recipe?.strMealThumb} alt={recipe?.strMeal} />
          : <div className="w-full p-12 text-center aspect-square bg-zinc-800">sem foto</div>
      }
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold">{recipe?.strMeal}</div>
        {
          recipe?.strInstructions ?
          <p className="text-base text-stone-200 line-clamp-5">
            {recipe?.strInstructions}
          </p> : null
        }
        
        <Link className="text-zinc-400" to={`/id/${recipe?.idMeal}`}>
          ver receita completa
        </Link>
      </div>
      {
        recipe?.strYoutube ? 
        <div className="max-w-xs px-6 py-4 truncate">
          <a href={recipe?.strYoutube} className="text-zinc-400">
            ver receita no YouTube
          </a>
        </div> : null
      }
      
      <div className="px-6 pt-4 pb-2">
        {
          tags.map((tag) => <span key={tag} className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold rounded-full text-stone-200 bg-zinc-900">{tag}</span>)
        }
      </div>
    </div>
  )
}
