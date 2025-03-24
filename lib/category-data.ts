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
    id: "bollywood",
    title: "Bollywood Movies",
    description: "Guess the Bollywood movie from 2000 onwards",
    emoji: "🎬",
    itemName: "movie",
    enableWordleStyle: true, // Enable Wordle-style highlighting for this category
    attributes: [
      {
        id: "release_year",
        name: "Release Year",
        icon: "📅",
        possibleValues: Array.from({ length: new Date().getFullYear() - 1999 }, (_, i) => (2000 + i).toString()),
      },
      {
        id: "genre",
        name: "Genre",
        icon: "🎞️",
        possibleValues: [
          "Action",
          "Comedy",
          "Drama",
          "Romance",
          "Biopic",
          "Sports",
        ]
      },
      {
        id: "director",
        name: "Director",
        icon: "🎥",
        possibleValues: [
          "Karan Johar",
          "Sanjay Leela Bhansali",
          "Rajkumar Hirani",
          "Rohit Shetty",
          "Zoya Akhtar",
          "Anurag Kashyap",
          "Imtiaz Ali",
          "Farhan Akhtar",
          "Rakeysh Omprakash Mehra",
          "Ashutosh Gowariker",
          "Vidhu Vinod Chopra", "Sandeep Reddy Vanga", "Pushkar, Gayatri", "Kabir Khan",
          "Vishnuvardhan", "Anurag Basu", "Om Raut", "Aditya Dhar", "Rahul Dholakia", "Nitesh Tiwari",
        ],
      },
      {
        id: "lead_actor",
        name: "Lead Actor",
        icon: "👨‍🎭",
        possibleValues: [
          "Shah Rukh Khan",
          "Aamir Khan",
          "Salman Khan",
          "Hrithik Roshan",
          "Ranbir Kapoor",
          "Ranveer Singh",
          "Akshay Kumar",
          "Ajay Devgn",
          "Amitabh Bachchan",
          "Shahid Kapoor",
          "Vikrant Massey", "Ranbir Kapoor",
          "Saif Ali Khan", "Ranveer Singh", "Sidharth Malhotra",
          "Abhishek Bachchan", "Rajkummar Rao", "Vicky Kaushal",
        ],
      },
      {
        id: "lead_actress",
        name: "Lead Actress",
        icon: "👩‍🎭",
        possibleValues: [
          "Deepika Padukone",
          "Priyanka Chopra",
          "Alia Bhatt",
          "Kareena Kapoor",
          "Katrina Kaif",
          "Aishwarya Rai",
          "Anushka Sharma",
          "Vidya Balan",
          "Kangana Ranaut",
          "Madhuri Dixit", "Medha Shankar", "Rashmika Mandanna", "Radhika Apte",
          "Kiara Advani", "Fatima Sana Shaikh", "Sanya Malhotra", "Kajol", "Yami Gautam",
        ],
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

