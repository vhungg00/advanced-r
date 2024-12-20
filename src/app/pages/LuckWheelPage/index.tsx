import { useCallback, useEffect, useRef, useState, Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { Loading } from 'app/components/elements/Loading'
import { Prizes } from 'services/luckyWheelServices'
import { luckyWheelServices } from 'services'
import { Box, Button, Center, Flex } from '@chakra-ui/react'
import { images } from 'assets'
import { randomIndex } from 'utils/randomIndex'
import dayjs, { Dayjs } from 'dayjs'
import { PrizeWon, StyleRotate, WinningResult } from './const/types'
import { LuckyWheel } from './modules/Wheel'
import { WinnerNoticeDialog } from './modules/WinnerNoticeDialog'

const ID_LUCKY_WHEEL = 'lucky-wheel'

const initialStyleRotate: StyleRotate = {
  deg: 0,
  timingFunc: 'ease-in-out',
  timeDuration: 0,
}
const CURRENT_TIME_DURATION_LUCKY_WHEEL_ROTATE = 12
const CURRENT_TIME_DURATION_NEEDLE_ROTATE = 0.6

export function LuckyWheelPage() {
  const isFetching = useRef<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [prizes, setPrizes] = useState<Prizes[]>([])
  const [countSpin, setCountSpin] = useState<number>(10)
  const [spinning, setSpinning] = useState<boolean>(false)
  const [time, setTime] = useState<Dayjs>()
  const [listPrizeWon, setListPrizeWon] = useState<PrizeWon[]>([])
  const [winningResult, setWinningResult] = useState<WinningResult>({
    name: '',
    img: '',
  })
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [timeNeedleRotate, setTimeNeedleRotate] = useState<number>(0)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const [styleRotate, setStyleRotate] =
    useState<StyleRotate>(initialStyleRotate)
  const [indexPrizeWon, setIndexPrizeWon] = useState<number | null>(null)

  const handleSpin = () => {
    if (countSpin <= 0 || spinning) return
    setSpinning(true)
    setCountSpin(prev => prev - 1)
    setTime(dayjs())
    const rand = randomIndex(prizes)
    console.log(rand)
    setIndexPrizeWon(rand)
    const { name, image } = prizes[rand]
    setTimeNeedleRotate(CURRENT_TIME_DURATION_NEEDLE_ROTATE)
    setListPrizeWon(prev => [
      ...prev,
      { name, img: image, time: dayjs().format('DD/MM/YYYY HH:mm:ss') },
    ])
  }

  useEffect(() => {
    if (indexPrizeWon !== null && time && spinning) {
      let d = styleRotate.deg
      d =
        d +
        (360 - (d % 360)) +
        (360 * 10 - indexPrizeWon * (360 / prizes.length))
      const timeRotate = CURRENT_TIME_DURATION_LUCKY_WHEEL_ROTATE

      setStyleRotate({
        deg: d,
        timingFunc: 'ease-in-out',
        timeDuration: timeRotate,
      })
      setWinningResult({
        name: prizes[indexPrizeWon].name,
        img: prizes[indexPrizeWon].image,
      })
      setTimeNeedleRotate(((timeRotate / 10) * 1) / 4)

      timeoutRef.current = setTimeout(
        () => {
          setTimeNeedleRotate(((timeRotate / 10) * 3) / 4)
        },
        (((timeRotate / 10) * 3) / 4) * 9000,
      )
      setIndexPrizeWon(null)
    }

    return () => {
      if (timeoutRef.current && !spinning) clearTimeout(timeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexPrizeWon, spinning, prizes])

  useEffect(() => {
    if (!spinning) return
    const el = document.getElementById(ID_LUCKY_WHEEL)
    if (!el) return
    const elWheel = el.querySelector('.wheel')
    if (!elWheel) return

    const handleAfterWheelFinished = () => {
      setSpinning(false)
      setIsOpen(true)
    }
    elWheel.addEventListener('transitionend', handleAfterWheelFinished)

    return () => {
      elWheel.removeEventListener('transitionend', handleAfterWheelFinished)
    }
  }, [spinning])

  const fetchData = useCallback(async () => {
    if (isFetching.current) return
    isFetching.current = true

    try {
      setIsLoading(true)
      const { data } = await luckyWheelServices.luckyWheelService()
      setPrizes(data)
    } finally {
      isFetching.current = false
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [show, setShow] = useState<boolean>(false)

  return (
    <Fragment>
      <Helmet>
        <title>Lucky Wheel</title>
      </Helmet>
      <Loading isLoading={isLoading} />
      <Flex
        backgroundAttachment={'fixed'}
        backgroundImage={{
          base: `${images.imageBgLuckySp}`,
          md: `${images.imageBgLuckyPc}`,
        }}
        backgroundPosition={'center top'}
        backgroundRepeat={'no-repeat'}
        backgroundSize={'cover'}
        flex={1}
        flexDirection={'column'}
        p={'0 16px'}
      >
        <Flex
          justifyContent={'center'}
          padding={'10px 0'}
          sx={{
            '& > img': {
              width: { base: '100px', md: '200px' },
            },
          }}
        >
          <img alt={'logo-app'} src={images.imageLogoApp} />
        </Flex>
        <Center margin={'0 auto'} width={'50%'}>
          <img alt={'slogan'} src={images.imageSlogan} />
        </Center>
        <Box>
          <LuckyWheel
            id={ID_LUCKY_WHEEL}
            prizes={prizes}
            spinning={spinning}
            styleRotate={styleRotate}
            timeNeedleRotate={timeNeedleRotate}
          />
        </Box>
        <Flex justifyContent={'center'} margin={' 0 0 30px'}>
          <Box maxW={'500px'} w={'full'}>
            <Button
              _disabled={{ backgroundImage: '#dedede' }}
              _hover={{ backgroundColor: 'rgb(255, 182, 0)' }}
              backgroundColor={'#edbf41'}
              boxShadow={'0 3px 0 0 #c08900'}
              color={'white'}
              letterSpacing={'unset'}
              width={'full'}
              onClick={handleSpin}
            >
              Chơi ngay
            </Button>
          </Box>
        </Flex>
        <Flex>{show && <div>show</div>}</Flex>
        <button onClick={() => setShow(!show)}>Click me!</button>
      </Flex>
      <WinnerNoticeDialog
        isOpen={isOpen}
        winningResult={winningResult}
        onClose={() => setIsOpen(false)}
      />
    </Fragment>
  )
}
