import { images } from 'assets'
import { PrizeResponse } from './luckyWheelServices.type'

export const dataPrizes: PrizeResponse = {
  data: [
    {
      name: 'Bộ trà',
      image: images.imageNitro,
      percent_page: 1, // 1%
    },
    {
      name: 'E-Voucher 100k',
      image: images.imageNitro,
      percent_page: 10, // 10%
    },
    {
      name: '100 điểm',
      image: images.imageNitro,
      percent_page: 20, // 20%
    },
    {
      name: 'Lượt chơi',
      image: images.imageNitro,
      percent_page: 80, // 50%
    },
    {
      name: 'Bộ chén',
      image: images.imageNitro,
      percent_page: 1, // 1%
    },
    {
      name: 'E-Voucher 50k',
      image: images.imageNitro,
      percent_page: 40, // 40%
    },
    {
      name: '10 điểm',
      image: images.imageNitro,
      percent_page: 60, // 60%
    },
    {
      name: 'Lượt chơi',
      image: images.imageNitro,
      percent_page: 60, // 60%
    },
  ],
}
