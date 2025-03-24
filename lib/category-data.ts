// Define the structure for category data
export interface CategoryData {
  id: string
  title: string
  description: string
  emoji: string
  itemName: string
  attributes: {
    id: string
    name: string
    icon: string
    possibleValues: string[]
  }[]
}

// Define available categories
export const categories: CategoryData[] = [
  {
    id: "fruits",
    title: "Fruit Guessing",
    description: "Guess the fruit based on its attributes",
    emoji: "🍎",
    itemName: "fruit",
    attributes: [
      {
        id: "taste",
        name: "Taste",
        icon: "👅",
        possibleValues: ["Sweet", "Sour", "Sweet-Sour", "Mild", "Sweet-Tart"],
      },
      {
        id: "origin",
        name: "Origin",
        icon: "🌍",
        possibleValues: [
          "Central Asia",
          "Southeast Asia",
          "China",
          "Europe",
          "South Asia",
          "South America",
          "Africa",
          "Middle East",
          "North America",
          "Mexico",
          "Central America",
        ],
      },
      {
        id: "color",
        name: "Color",
        icon: "🎨",
        possibleValues: ["Red", "Yellow", "Orange", "Green", "Purple", "Brown", "Blue", "Pink"],
      },
      {
        id: "texture",
        name: "Texture",
        icon: "👆",
        possibleValues: ["Crisp", "Soft", "Juicy", "Firm", "Creamy"],
      },
    ],
  },
  {
    id: "countries",
    title: "Country Guessing",
    description: "Guess the country based on its attributes",
    emoji: "🌎",
    itemName: "country",
    attributes: [
      {
        id: "continent",
        name: "Continent",
        icon: "🗺️",
        possibleValues: ["Europe", "Asia", "Africa", "North America", "South America", "Oceania", "Antarctica"],
      },
      {
        id: "language",
        name: "Language",
        icon: "🗣️",
        possibleValues: [
          "English",
          "Spanish",
          "French",
          "German",
          "Chinese",
          "Arabic",
          "Russian",
          "Portuguese",
          "Japanese",
          "Hindi",
        ],
      },
      {
        id: "climate",
        name: "Climate",
        icon: "🌡️",
        possibleValues: ["Tropical", "Arid", "Mediterranean", "Temperate", "Continental", "Polar"],
      },
      {
        id: "population",
        name: "Population",
        icon: "👥",
        possibleValues: ["Small", "Medium", "Large", "Very Large"],
      },
    ],
  },

  {
    id: "animals",
    title: "Animal Guessing",
    description: "Guess the animal based on its attributes",
    emoji: "🐾",
    itemName: "animal",
    attributes: [
      {
        id: "habitat",
        name: "Habitat",
        icon: "🏞️",
        possibleValues: ["Forest", "Savannah", "Ocean", "Desert", "Arctic", "Grassland", "Freshwater"],
      },
      {
        id: "diet",
        name: "Diet",
        icon: "🍽️",
        possibleValues: ["Herbivore", "Carnivore", "Omnivore"],
      },
      {
        id: "size",
        name: "Size",
        icon: "📏",
        possibleValues: ["Small", "Medium", "Large", "Gigantic"],
      },
      {
        id: "movement",
        name: "Movement",
        icon: "🏃",
        possibleValues: ["Walks", "Flies", "Swims", "Crawls"],
      },
    ],
  },
  {
    id: "vehicles",
    title: "Vehicle Guessing",
    description: "Guess the vehicle based on its attributes",
    emoji: "🚗",
    itemName: "vehicle",
    attributes: [
      {
        id: "type",
        name: "Type",
        icon: "🚘",
        possibleValues: ["Car", "Motorcycle", "Bicycle", "Truck", "Boat", "Airplane", "Train"],
      },
      {
        id: "fuel",
        name: "Fuel Type",
        icon: "⛽",
        possibleValues: ["Petrol", "Diesel", "Electric", "Hybrid"],
      },
      {
        id: "terrain",
        name: "Terrain",
        icon: "🌄",
        possibleValues: ["Road", "Off-road", "Water", "Air", "Rail"],
      },
      {
        id: "capacity",
        name: "Capacity",
        icon: "👥",
        possibleValues: ["1-2 people", "3-5 people", "6-10 people", "More than 10"],
      },
    ],
  },
]

// Helper function to get category data by ID
export function getCategoryData(categoryId: string): CategoryData | undefined {
  return categories.find((category) => category.id === categoryId)
}

// Import data for each category
import { fruitData } from "./fruit-data"
import { countryData } from "./country-data"
import { animalData } from "./animal-data"
import { vehicleData } from "./vehicle-data"

// Helper function to get items for a specific category
export function getItemsForCategory(categoryId: string): any[] {
  switch (categoryId) {
    case "fruits":
      return fruitData
    case "countries":
      return countryData
    case "animals": return animalData;
    case "vehicles": return vehicleData;
    default:
      return []
  }
}

