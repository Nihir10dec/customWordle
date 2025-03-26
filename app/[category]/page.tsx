import GuessingGame from "@/components/guessing-game"
import { getCategoryData } from "@/lib/category-data"
import { notFound } from "next/navigation"

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const { category } = params
  const categoryData = getCategoryData(category)

  if (!categoryData) {
    notFound()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16 p-4 md:p-16">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">{categoryData.title}</h1>
        <GuessingGame category={category} />
      </div>
    </main>
  )
}

