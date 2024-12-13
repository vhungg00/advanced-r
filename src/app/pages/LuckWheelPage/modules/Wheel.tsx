import { FC, memo, useCallback, useEffect, useRef } from 'react'
import { Center, ChakraProps, Flex, useTheme } from '@chakra-ui/react'
import { Prizes } from 'services/luckyWheelServices'
import styled from '@emotion/styled'
import { images } from 'assets'

type Props = {
  id: string
  styleRotate?: {
    deg: number
    timingFunc: string
    timeDuration: number
  }
  prizes: Prizes[]
  timeNeedleRotate?: number
  spinning?: boolean
}

const Component: FC<Props> = props => {
  const DEFAULT_DEG = 0
  const arrowRef = useRef<HTMLDivElement | null>(null)
  const wheelRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { id, styleRotate, prizes } = props

  const styleWheel: ChakraProps['__css'] = {
    transform: `rotate(${styleRotate?.deg}deg)`,
    transitionTimingFunction: styleRotate?.timingFunc,
    transitionDuration: `${styleRotate?.timeDuration}s`,
  }

  const theme = useTheme()

  const drawWheel = useCallback(
    (prizes: Prizes[]) => {
      const length = prizes?.length
      const rotateDeg = 360 / length / 2 + 90

      if (!wheelRef.current) return

      const ctx = wheelRef.current.getContext('2d')!
      const centerX = 250
      const centerY = 250
      const radius = 250

      for (let i = 0; i < length; i++) {
        ctx.save()
        ctx.beginPath()
        ctx.translate(250, 250)
        ctx.moveTo(0, 0)
        ctx.rotate((((360 / length) * i - rotateDeg) * Math.PI) / 180)
        ctx.arc(0, 0, 250, 0, (2 * Math.PI) / length, false)
        ctx.fillStyle =
          i % 2 === 0 ? `${theme.colors.blue[100]}` : `${theme.colors.white}`
        ctx.fill()
        ctx.restore()
      }

      prizes.forEach((prize, i) => {
        const image = new Image()
        image.src = prize.image
        image.onload = () => {
          ctx.save()
          ctx.translate(centerX, centerY)

          ctx.rotate(
            (((360 / length) * i - rotateDeg + 360 / length / 2) * Math.PI) /
              180,
          )
          ctx.translate(-centerX, -centerY)

          const imgX = radius - 50
          const imgY = 30
          ctx.drawImage(image, imgX, imgY, 100, 100)

          ctx.restore()
        }
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id],
  )

  useEffect(() => {
    void drawWheel(prizes)
  }, [drawWheel, prizes])

  return (
    <Flex flex={1} justifyContent={'center'}>
      <Flex
        alignItems={'center'}
        backgroundSize={'cover'}
        flexDirection={'column'}
        id={id}
        justifyContent={'center'}
        overflow={'hidden'}
        position={'relative'}
        maxW={'600px'}
        w={'full'}
      >
        <Center
          ref={arrowRef}
          className={'arrow'}
          position={'absolute'}
          top={'-1%'}
          w={'100%'}
          zIndex={2}
        >
          <img
            alt="lucky-arrow"
            src={images.imageLuckyArrow}
            style={{ width: '12%' }}
          />
        </Center>
        <Center
          backgroundColor={'white'}
          borderRadius={'50%'}
          className={'arrow'}
          cursor={'pointer'}
          h={'24%'}
          left={'50%'}
          position={'absolute'}
          top={'50%'}
          transform={'translate(-50%, -50%)'}
          w={'24%'}
          zIndex={10}
        >
          <img
            alt="lucky-arrow"
            src={images.imageLogoMiniGame}
            style={{ width: '100%' }}
          />
        </Center>
        <img
          src={images.imageWheelBorder}
          style={{ position: 'absolute', zIndex: '10' }}
        />
        <WrapperWheel
          ref={containerRef}
          alignItems={'center'}
          justifyContent={'center'}
          __css={styleRotate?.deg !== DEFAULT_DEG ? styleWheel : {}}
          className={'wheel'}
          flexDirection={'column'}
          position={'absolute'}
          w={'93%'}
        >
          <canvas ref={wheelRef} height={'500px'} width={'500px'} />
        </WrapperWheel>
      </Flex>
    </Flex>
  )
}

export const LuckyWheel = memo(Component)

const WrapperWheel = styled(Flex)`
  & > canvas {
    width: inherit;
    height: inherit;
    border-radius: 50%;
  }
`
