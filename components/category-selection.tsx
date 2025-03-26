"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/category-data"
import { getCategoryButtonColor, getCategoryColor } from "@/lib/utils"

export default function CategorySelection() {
  const router = useRouter()

  const handleCategorySelect = (categoryId: string) => {
    router.push(`/${categoryId}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((category) => (
        <Card key={category.id} className="overflow-hidden border-2 hover:border-primary transition-colors">
          <CardHeader className={`pb-2 ${getCategoryColor(category.id)}`}>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">{category.emoji}</span>
              <span>{category.title}</span>
            </CardTitle>
            <CardDescription className="text-foreground/70">{category.description}</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">
              Guess the {category.itemName} based on its {category.attributes.map((a) => a.name).join(", ")}.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              className={`w-full ${getCategoryButtonColor(category.id)}`}
              onClick={() => handleCategorySelect(category.id)}
            >
              Play {category.title}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

