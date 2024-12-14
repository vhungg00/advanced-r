export type StyleRotate = {
  deg: number
  timingFunc: 'ease-in-out' | 'ease'
  timeDuration: number
}

export type ConfigModal = {
  openModal: boolean
  typeModal: 'list' | 'notify'
}

export type PrizeWon = {
  name: string
  img: string
  time: string
}

export type WinningResult = {
  name: string
  img: string
}
