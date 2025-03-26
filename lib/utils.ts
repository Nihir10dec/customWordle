import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryColor(categoryId: string): string {
  switch (categoryId) {
    case "fruits":
      return "bg-red-100 dark:bg-red-900/20"
    case "countries":
      return "bg-blue-100 dark:bg-blue-900/20"
    case "bollywood":
      return "bg-amber-100 dark:bg-amber-900/20"
    case "animals":
      return "bg-green-100 dark:bg-green-900/20"
    case "vehicles":
      return "bg-purple-100 dark:bg-purple-900/20"
    case "science":
      return "bg-teal-100 dark:bg-teal-900/20"
    default:
      return "bg-primary/10"
  }
}


export function getCategoryHeaderColor(categoryId: string): string {
  switch (categoryId) {
    case "fruits":
      return "bg-red-100 dark:bg-red-900/20"
    case "countries":
      return "bg-blue-100 dark:bg-blue-900/20"
    case "bollywood":
      return "bg-amber-100 dark:bg-amber-900/20"
    case "animals":
      return "bg-green-100 dark:bg-green-900/20"
    case "vehicles":
      return "bg-purple-100 dark:bg-purple-900/20"
    case "science":
      return "bg-teal-100 dark:bg-teal-900/20"
    default:
      return "bg-primary/10"
  }
}

export function getCategoryButtonColor(categoryId: string): string {
  switch (categoryId) {
    case "fruits":
      return "bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600"
    case "countries":
      return "bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600"
    case "bollywood":
      return "bg-amber-500 hover:bg-amber-600 dark:bg-amber-700 dark:hover:bg-amber-600"
    case "animals":
      return "bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600"
    case "vehicles":
      return "bg-purple-500 hover:bg-purple-600 dark:bg-purple-700 dark:hover:bg-purple-600"
    case "science":
      return "bg-teal-500 hover:bg-teal-600 dark:bg-teal-700 dark:hover:bg-teal-600"
    default:
      return ""
  }
}

export function getCategoryInputColor(categoryId: string): string {
  switch (categoryId) {
    case "fruits":
      return "focus:border-red-500 dark:focus:border-red-400"
    case "countries":
      return "focus:border-blue-500 dark:focus:border-blue-400"
    case "bollywood":
      return "focus:border-amber-500 dark:focus:border-amber-400"
    case "animals":
      return "focus:border-green-500 dark:focus:border-green-400"
    case "vehicles":
      return "focus:border-purple-500 dark:focus:border-purple-400"
    case "science":
      return "focus:border-teal-500 dark:focus:border-teal-400"
    default:
      return "focus:border-primary"
  }
}
