const searchbox = document.querySelector(".searchbox");
const searchBtn = document.querySelector(".searchbtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

// recipecontainer write fetching recipe

//functions / fetch api/ to get recipes
const fetchRecipe = async (query) => {
  recipeContainer.innerHTML = "<h2> Fetching Recipe.... </h2> ";
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    // json convert
    const res = await data.json();

    // remove html recipecontainer
    recipeContainer.innerHTML = "";
    // here end
    res.meals.forEach((meal) => {
      const recipeDiv = document.createElement("Div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `
<img src = "${meal.strMealThumb}">
<h3>${meal.strMeal}</h3>
<p>${meal.strCategory}</p>
`;
      // create new button below recipe
      const button = document.createElement("button");
      button.textContent = "View Recipe ";
      recipeDiv.appendChild(button);

      // adding addeventlistener to button
      button.addEventListener("click", () => {
        OpenRecipePopup(meal);
      });
      // end
      recipeContainer.appendChild(recipeDiv);
    });
  } catch (error) {
    recipeContainer.innerHTML = "<h2> Error in  Fetching Recipe.... </h2> ";
  }
};
// functions to fetch ingredients
const fetchIngredients = (meal) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};
const OpenRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
 <h2 class="RecipeName">${meal.strMeal} </h2>
<h3> Ingredients : </h3>
<ul class="IngredientsList">${fetchIngredients(meal)}</ul>
<div class="recipeInstructions">
<h3> Instructions : </h3>
<p>${meal.strInstructions}</p>
</div>
 `;
  recipeDetailsContent.parentElement.style.display = "block";
};

// closeBtn
recipeCloseBtn.addEventListener("click", () => {
  recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchbox.value.trim();
  if (!searchInput) {
    recipeContainer.innerHTML = `<h2> Type the Meal you want to search </h2>`;
    return;
  }
  fetchRecipe(searchInput);
});
