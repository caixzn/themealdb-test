
async function getRecipeById(id: string) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (response.ok) {
        const data = await response.json();
        return data.meals[0];
    }
    return null;
}

export async function getRecipeRandom() {
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

export async function IngredientLoader() {
    const { meals } = await getIngredients();
    return meals;
}
