import { dataPrizes } from './_mock'
import { PrizeResponse } from './luckyWheelServices.type'

export class LuckyWheelServices {
  async luckyWheelService(): Promise<PrizeResponse> {
    return await new Promise(resolve =>
      setTimeout(() => resolve(dataPrizes), 1000),
    )
  }
}
