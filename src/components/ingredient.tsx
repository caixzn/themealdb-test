import { Link } from "react-router-dom";

export function IngredientList({ ingredients, filterText }: { ingredients: Ingredient[], filterText?: string; }) {
  return (
    <div className="flex flex-col flex-wrap gap-4 my-6 max-w-fit">
      {
        ingredients
          .filter((ingredient) => filterText ? ingredient.strIngredient.toLowerCase().includes(filterText.toLowerCase()) : true)
          .map((ingredient) => <IngredientButton key={ingredient.idIngredient} ingredientName={ingredient.strIngredient} />)
      }
    </div>
  )
}

export function IngredientButton({ ingredientName }: { ingredientName: string; }) {
  return (
    <Link className="gap-2 px-4 py-1 transition ease-in-out rounded-sm cursor-pointer hover:bg-zinc-300 hover:text-stone-800" to={`${ingredientName.toLocaleLowerCase().replace(/ /g, '_')}`}>
      {ingredientName}
    </Link>
  )
}
