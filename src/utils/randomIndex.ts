import { Prizes } from 'services/luckyWheelServices'

export function randomIndex(prizes: Prizes[]) {
  const cumulativeRatios: number[] = []
  let cumulativeRatio = 0

  for (const prize of prizes) {
    cumulativeRatio += prize.percent_page
    cumulativeRatios.push(cumulativeRatio)
  }

  const totalCumulativeRatio = cumulativeRatios[cumulativeRatios.length - 1]
  const randomValue = Math.random() * totalCumulativeRatio

  for (let i = 0; i < cumulativeRatios.length; i++) {
    if (randomValue <= cumulativeRatios[i]) {
      return i
    }
  }

  return -1
}
