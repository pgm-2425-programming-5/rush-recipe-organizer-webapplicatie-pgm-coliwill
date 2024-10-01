"use client";

import { useRouter } from "next/navigation";
import defaultRecipes from "../defaultRecipes.json";

type category = "breakfast" | "lunch" | "dinner" | "dessert";

type recipe = {
  name: string;
  ingredients: string[];
  instructions: string;
  category: category;
};

function handleAddRecipe() {
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const ingredients = (
    document.getElementById("ingredients") as HTMLInputElement
  ).value.split(",");
  const instructions = (
    document.getElementById("instructions") as HTMLInputElement
  ).value;
  const category = (document.getElementById("category") as HTMLSelectElement)
    .value as category;

  const newRecipe: recipe = {
    name,
    ingredients,
    instructions,
    category,
  };

  const existingRecipes = JSON.parse(localStorage.getItem("recipes") || "[]");
  if (existingRecipes.length === 0) {
    localStorage.setItem("recipes", JSON.stringify(defaultRecipes));
  }

  existingRecipes.push(newRecipe);

  localStorage.setItem("recipes", JSON.stringify(existingRecipes));
}

export default function AddRecipe() {
  const router = useRouter();

  return (
    <form
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded"
      onSubmit={(e) => {
        e.preventDefault();
        handleAddRecipe();
        router.push("/recepten");
      }}
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="ingredients"
          className="block text-sm font-medium text-gray-700"
        >
          Ingredients
        </label>
        <input
          type="text"
          id="ingredients"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="instructions"
          className="block text-sm font-medium text-gray-700"
        >
          Instructions
        </label>
        <textarea
          id="instructions"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="dessert">Dessert</option>
        </select>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Recipe
      </button>
    </form>
  );
}