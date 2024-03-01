import { file, write } from 'bun'

export interface Combination {
  first: string
  second: string
}

export type SerializedCombination = string

export function serializeCombination({ first, second }: Combination) {
  const [a, b] = [first, second].sort()
  return `${a} |-| ${b}`
}

export class Combinations {
  private combinations: Set<SerializedCombination> = new Set()

  add(combination: Combination) {
    this.combinations.add(serializeCombination(combination))
  }

  has(combination: Combination) {
    return this.combinations.has(serializeCombination(combination))
  }

  async loadFromDisk() {
    const values = await file('data/combinations.json').json()
    this.combinations = new Set(values)
  }

  startStoringToDisk() {
    const timer = setInterval(() => this.storeToDisk(), 10_000)
    return () => clearInterval(timer)
  }

  async storeToDisk() {
    const data = JSON.stringify([...this.combinations.values()], null, 2)
    await write('data/combinations.json', data)
  }
}
