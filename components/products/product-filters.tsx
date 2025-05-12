"use client"

import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface ProductFiltersProps {
  categories: string[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  priceRange: [number, number]
  onPriceRangeChange: (range: [number, number]) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

export default function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
}: ProductFiltersProps) {
  const handlePriceChange = (values: number[]) => {
    onPriceRangeChange([values[0], values[1]])
  }

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      onCategoryChange(null)
    } else {
      onCategoryChange(category)
    }
  }

  const handleReset = () => {
    onCategoryChange(null)
    onPriceRangeChange([0, 200])
    onSortChange("featured")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Сортировать по</h3>
        <RadioGroup value={sortBy} onValueChange={onSortChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="featured" id="featured" />
            <Label htmlFor="featured">Рекомендуемые</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-low" id="price-low" />
            <Label htmlFor="price-low">Цена: от низкой к высокой</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="price-high" id="price-high" />
            <Label htmlFor="price-high">Цена: от высокой к низкой</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="newest" id="newest" />
            <Label htmlFor="newest">Новинки</Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Категории</h3>
        <div className="space-y-2">
          {categories.map((category) => {
            const displayName =
              {
                "spray-paint": "Аэрозольная краска",
                varnish: "Лак",
                primer: "Грунтовка",
                accessories: "Аксессуары",
              }[category] || category

            return (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="mr-2 mb-2"
                onClick={() => handleCategoryClick(category)}
              >
                {displayName}
              </Button>
            )
          })}
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">Диапазон цен</h3>
          <span className="text-sm text-gray-500">
            ₽{priceRange[0]} - ₽{priceRange[1]}
          </span>
        </div>
        <Slider
          defaultValue={[priceRange[0], priceRange[1]]}
          max={200}
          step={1}
          value={[priceRange[0], priceRange[1]]}
          onValueChange={handlePriceChange}
          className="mb-6"
        />
      </div>

      <Button variant="outline" onClick={handleReset} className="w-full">
        Сбросить фильтры
      </Button>
    </div>
  )
}
