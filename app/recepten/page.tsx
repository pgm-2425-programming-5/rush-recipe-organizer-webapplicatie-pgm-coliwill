"use client";

import { useState } from "react";
import defaultRecipesData from "../defaultRecipes.json";

type category = "breakfast" | "lunch" | "dinner" | "dessert";

type recipe = {
  name: string;
  ingredients: string[];
  instructions: string;
  category: category;
};

function removeRecipe(name: string) {
  const storedRecipes = JSON.parse(localStorage.getItem("recipes") || "[]");
  const updatedRecipes = storedRecipes.filter(
    (recipe: recipe) => recipe.name !== name
  );
  localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
  window.location.reload();
}

export default function Recipes() {
  const [selectedCategory, setSelectedCategory] = useState<category | "all">(
    "all"
  );

  const storedRecipes = JSON.parse(localStorage.getItem("recipes") || "[]");
  const defaultRecipes: recipe[] = defaultRecipesData.map((recipe) => ({
    ...recipe,
    category: recipe.category as category,
  }));
  const recipes: recipe[] = defaultRecipes.concat(storedRecipes);

  const filteredRecipes =
    selectedCategory === "all"
      ? recipes
      : recipes.filter((recipe) => recipe.category === selectedCategory);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recepten</h1>

      <div className="flex space-x-4 mb-4">
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            selectedCategory === "breakfast" ? "bg-blue-700" : ""
          }`}
          onClick={() => setSelectedCategory("breakfast")}
        >
          Ontbijt
        </button>
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            selectedCategory === "lunch" ? "bg-blue-700" : ""
          }`}
          onClick={() => setSelectedCategory("lunch")}
        >
          Lunch
        </button>
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            selectedCategory === "dinner" ? "bg-blue-700" : ""
          }`}
          onClick={() => setSelectedCategory("dinner")}
        >
          Diner
        </button>
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            selectedCategory === "dessert" ? "bg-blue-700" : ""
          }`}
          onClick={() => setSelectedCategory("dessert")}
        >
          Dessert
        </button>
        <button
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            selectedCategory === "all" ? "bg-blue-700" : ""
          }`}
          onClick={() => setSelectedCategory("all")}
        >
          Alle
        </button>
      </div>

      <ul className="space-y-4">
        {filteredRecipes.map((recipe) => (
          <li key={recipe.name} className="border p-4 rounded shadow relative">
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={() => removeRecipe(recipe.name)}
            >
              X
            </button>
            <h2 className="text-xl font-semibold">{recipe.name}</h2>
            <p className="text-sm text-gray-500">{recipe.category}</p>
            <ul className="list-disc list-inside mt-2">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient} className="text-gray-700">
                  {ingredient}
                </li>
              ))}
            </ul>
            <p className="mt-2">{recipe.instructions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
