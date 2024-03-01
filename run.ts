import { serializeCombination } from './Combination'
import { Combinations } from './Combination'
import { Combination } from './Combination'
import { Ingredients } from './Ingredient'
import { fetchCraft } from './fetchCraft'
import { sleep } from './sleep'

export async function main() {
  const ingredients = new Ingredients()
  const triedCombinations: Combinations = new Combinations()

  await triedCombinations.loadFromDisk()
  triedCombinations.startStoringToDisk()

  await ingredients.loadFromDisk()
  ingredients.startStoringToDisk()

  while (true) {
    await playOneRound(ingredients, triedCombinations)
    if (shouldSleep) await sleep(1000)
  }
}

async function playOneRound(ingredients: Ingredients, triedCombinations: Combinations) {
  const combination = findNewRandomCombination(ingredients, triedCombinations)
  const result = await fetchCraft(combination)
  const firstEmoji = ingredients.emoji(combination.first)
  const secondEmoji = ingredients.emoji(combination.second)
  console.log(
    `${firstEmoji}${secondEmoji} => ${result.emoji} ${result.isNew ? '✨✨✨ NEW ✨✨✨ ' : ''}: ${
      combination.first
    } and ${combination.second} is ${result.result}`
  )
  ingredients.add({ name: result.result, emoji: result.emoji })
  triedCombinations.add(combination)
}

function findNewRandomCombination(
  ingredients: Ingredients,
  triedCombinations: Combinations
): Combination {
  while (true) {
    const combination = findNewRandomCombinationOrUndefined(ingredients, triedCombinations)
    if (combination) return combination
  }
}

function findNewRandomCombinationOrUndefined(
  ingredients: Ingredients,
  triedCombinations: Combinations
): Combination | undefined {
  const combination = randomCombination(ingredients)
  return triedCombinations.has(combination) ? undefined : combination
}

function randomCombination(ingredients: Ingredients): Combination {
  const first = ingredients.random()
  const second = ingredients.random()
  return { first, second }
}

const shouldSleep = true
await main()
