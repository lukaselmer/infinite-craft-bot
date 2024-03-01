import { file, write } from 'bun'

export class Ingredients {
  private ingredientsArray: IngredientName[] = ['Water', 'Fire', 'Wind', 'Earth']
  private ingredientsMap: Map<IngredientName, Emoji> = new Map([
    ['Water', '💧'],
    ['Fire', '🔥'],
    ['Wind', '💨'],
    ['Earth', '🌍'],
  ])

  add(ingredient: Ingredient) {
    this.ingredientsMap.set(ingredient.name, ingredient.emoji)
    this.ingredientsArray.push(ingredient.name)
  }

  has(ingredient: IngredientName) {
    return this.ingredientsMap.has(ingredient)
  }

  emoji(ingredient: IngredientName) {
    const found = this.ingredientsMap.get(ingredient)
    if (typeof found !== 'string') throw new Error(`Ingredient/emoji not found: ${ingredient}`)
    return found ? found : 'N'
  }

  random(): IngredientName {
    const index = Math.floor(Math.random() * this.ingredientsArray.length)
    return this.ingredientsArray[index]
  }

  async loadFromDisk() {
    const entries = await file('data/ingredients.json').json()
    if (entries.length === 0) return

    this.ingredientsMap = new Map(entries)
    this.ingredientsArray = [...this.ingredientsMap.keys()]
  }

  startStoringToDisk() {
    const timer = setInterval(() => this.storeToDisk(), 10_000)
    return () => clearInterval(timer)
  }

  async storeToDisk() {
    const data = JSON.stringify([...this.ingredientsMap.entries()], null, 2)
    await write('data/ingredients.json', data)
  }
}

export interface Ingredient {
  name: IngredientName
  emoji: Emoji
}

export type IngredientName = string
export type Emoji = string
