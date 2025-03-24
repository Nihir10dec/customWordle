import CategorySelection from "@/components/category-selection"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16 p-4 md:p-16">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Guessing Game</h1>
        <CategorySelection />
      </div>
    </main>
  )
}

