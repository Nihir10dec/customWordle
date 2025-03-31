// Define the structure for category data
export interface CategoryData {
  id: string
  title: string
  description: string
  emoji: string
  itemName: string;
  enableWordleStyle?: boolean; // New flag for enabling Wordle-style highlighting
  attributes: {
    id: string
    name: string
    icon: string
    possibleValues: string[]
  }[]
}

// Helper function to extract unique values from an array of objects for a specific key
function getUniqueValues(data: any[], key: string): string[] {
  return [...new Set(data.map((item) => item[key]))].filter(Boolean).sort()
}

// Define available categories
export const categories: CategoryData[] = [
  {
    id: "fruits",
    title: "Fruit Guessing",
    description: "Guess the fruit based on its attributes",
    enableWordleStyle: true, // Enable Wordle-style highlighting for this category
    emoji: "🍎",
    itemName: "Fruit",
    attributes: [
      {
        id: "taste",
        name: "Taste",
        icon: "👅",
        possibleValues: getUniqueValues(fruitData, "taste"),
      },
      {
        id: "origin",
        name: "Origin",
        icon: "🌍",
        possibleValues: getUniqueValues(fruitData, "origin"),
      },
      {
        id: "color",
        name: "Color",
        icon: "🎨",
        possibleValues: getUniqueValues(fruitData, "color"),
      },
      {
        id: "texture",
        name: "Texture",
        icon: "👆",
        possibleValues: getUniqueValues(fruitData, "texture"),
      },
    ],
  },
  {
    id: "countries",
    title: "Country Guessing",
    description: "Guess the country based on its attributes",
    enableWordleStyle: true, // Enable Wordle-style highlighting for this category
    emoji: "🌎",
    itemName: "Country",
    attributes: [
      {
        id: "continent",
        name: "Continent",
        icon: "🗺️",
        possibleValues: getUniqueValues(countryData, "continent"),
      },
      {
        id: "language",
        name: "Language",
        icon: "🗣️",
        possibleValues: getUniqueValues(countryData, "language"),
      },
      {
        id: "climate",
        name: "Climate",
        icon: "🌡️",
        possibleValues: getUniqueValues(countryData, "climate"),
      },
      {
        id: "population",
        name: "Population",
        icon: "👥",
        possibleValues: getUniqueValues(countryData, "population"),
      },
    ],
  },
  {
    id: "animals",
    title: "Animal Guessing",
    description: "Guess the animal based on its attributes",
    enableWordleStyle: true, // Enable Wordle-style highlighting for this category
    emoji: "🐾",
    itemName: "Animal",
    attributes: [
      {
        id: "habitat",
        name: "Habitat",
        icon: "🏞️",
        possibleValues: getUniqueValues(animalData, "habitat"),
      },
      {
        id: "diet",
        name: "Diet",
        icon: "🍽️",
        possibleValues: getUniqueValues(animalData, "diet"),
      },
      {
        id: "size",
        name: "Size",
        icon: "📏",
        possibleValues: getUniqueValues(animalData, "size"),
      },
      {
        id: "movement",
        name: "Movement",
        icon: "🏃",
        possibleValues: getUniqueValues(animalData, "movement"),
      },
    ],
  },
  {
    id: "bollywood",
    title: "Bollywood Movies",
    description: "Guess the Bollywood movie from 2000 onwards",
    emoji: "🎬",
    itemName: "Movie",
    enableWordleStyle: true, // Enable Wordle-style highlighting for this category
    attributes: [
      {
        id: "release_year",
        name: "Release Year",
        icon: "📅",
        possibleValues: getUniqueValues(bollywoodData, "release_year"),
      },
      {
        id: "genre",
        name: "Genre",
        icon: "🎥",
        possibleValues: getUniqueValues(bollywoodData, "genre"),
      },
      // {
      //   id: "director",
      //   name: "Director",
      //   icon: "🎥",
      //   possibleValues: getUniqueValues(bollywoodData, "director"),
      // },
      {
        id: "lead_actor",
        name: "Lead Actor",
        icon: "👨‍🎭",
        possibleValues: getUniqueValues(bollywoodData, "lead_actor"),
      },
      {
        id: "lead_actress",
        name: "Lead Actress",
        icon: "👩‍🎭",
        possibleValues: getUniqueValues(bollywoodData, "lead_actress"),
      },
    ],
  },
  // {
  //   id: "vehicles",
  //   title: "Vehicle Guessing",
  //   description: "Guess the vehicle based on its attributes",
  //   emoji: "🚗",
  //   itemName: "vehicle",
  //   attributes: [
  //     {
  //       id: "type",
  //       name: "Type",
  //       icon: "🚘",
  //       possibleValues: ["Car", "Motorcycle", "Bicycle", "Truck", "Boat", "Airplane", "Train"],
  //     },
  //     {
  //       id: "fuel",
  //       name: "Fuel Type",
  //       icon: "⛽",
  //       possibleValues: ["Petrol", "Diesel", "Electric", "Hybrid"],
  //     },
  //     {
  //       id: "terrain",
  //       name: "Terrain",
  //       icon: "🌄",
  //       possibleValues: ["Road", "Off-road", "Water", "Air", "Rail"],
  //     },
  //     {
  //       id: "capacity",
  //       name: "Capacity",
  //       icon: "👥",
  //       possibleValues: ["1-2 people", "3-5 people", "6-10 people", "More than 10"],
  //     },
  //   ],
  // },
  // {
  //   id: "landmarks",
  //   title: "Famous Landmarks",
  //   description: "Guess the famous landmark based on its attributes",
  //   emoji: "🏛",
  //   itemName: "landmark",
  //   attributes: [
  //     {
  //       id: "location",
  //       name: "Location",
  //       icon: "🌍",
  //       possibleValues: ["Europe", "Asia", "Africa", "North America", "South America", "Oceania"],
  //     },
  //     {
  //       id: "era",
  //       name: "Era",
  //       icon: "🏛",
  //       possibleValues: ["Ancient", "Medieval", "Modern"],
  //     },
  //     {
  //       id: "material",
  //       name: "Material",
  //       icon: "🏗",
  //       possibleValues: ["Stone", "Metal", "Concrete", "Brick"],
  //     },
  //     {
  //       id: "significance",
  //       name: "Significance",
  //       icon: "🌟",
  //       possibleValues: ["Cultural", "Historical", "Architectural", "Religious"],
  //     },
  //   ],
  // },
  // {
  //   id: "historical_figures",
  //   title: "Historical Figures",
  //   description: "Guess the historical figure based on their attributes",
  //   emoji: "🎭",
  //   itemName: "figure",
  //   attributes: [
  //     {
  //       id: "time_period",
  //       name: "Time Period",
  //       icon: "⏳",
  //       possibleValues: ["Ancient", "Medieval", "Modern", "Contemporary"],
  //     },
  //     {
  //       id: "region",
  //       name: "Region",
  //       icon: "🌍",
  //       possibleValues: ["Asia", "Europe", "Africa", "Americas"],
  //     },
  //     {
  //       id: "impact",
  //       name: "Impact",
  //       icon: "🏆",
  //       possibleValues: ["Politics", "Science", "Literature", "Art", "Military"],
  //     },
  //     {
  //       id: "field_of_expertise",
  //       name: "Field of Expertise",
  //       icon: "🎓",
  //       possibleValues: ["Philosophy", "Leadership", "Science", "Exploration", "Warfare"],
  //     },
  //   ],
  // },
]

// Helper function to get category data by ID
export function getCategoryData(categoryId: string): CategoryData | undefined {
  return categories.find((category) => category.id === categoryId)
}

// Import data for each category
import { fruitData } from "./fruit-data"
import { countryData } from "./country-data"
import { animalData } from "./animal-data"
import { bollywoodData } from "./bollywood-data"

// Helper function to get items for a specific category
export function getItemsForCategory(categoryId: string): any[] {
  switch (categoryId) {
    case "fruits":
      return fruitData
    case "countries":
      return countryData
    case "animals": return animalData;
    case "bollywood": return bollywoodData;
    default:
      return []
  }
}

