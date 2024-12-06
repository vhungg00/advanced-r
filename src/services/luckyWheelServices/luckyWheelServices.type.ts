export interface Prizes {
  name: string
  image: string
  percent_page: number
}

export type PrizeResponse = {
  data: Prizes[]
}
