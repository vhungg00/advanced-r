import { FC, memo, useCallback, useEffect, useRef } from 'react'
import { Center, ChakraProps, Flex } from '@chakra-ui/react'
import { IconArrowWheel } from 'app/components/elements/Icons/IconArrowWheel'
import { Prizes } from 'services/luckyWheelServices'

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

  // function to drawl lucky wheel with canvas
  const drawWheel = useCallback(
    (prizes: Prizes[]) => {
      const length = prizes?.length
      const rotateDeg = 360 / length / 2 + 90
      const turnNum = 1 / length
      const html = []

      const ulElementFirstRender = document.querySelector('.list')

      if (ulElementFirstRender) {
        ulElementFirstRender.remove()
      }

      const el = document.getElementById(id)
      if (!el || !containerRef.current || !wheelRef.current) return

      const prizeItems = document.createElement('ul')
      const prizeList = [...prizes]
      const ctx = wheelRef.current.getContext('2d')!

      for (let i = 0; i < length; i++) {
        ctx.save()
        ctx.beginPath()
        ctx.translate(250, 250)
        ctx.moveTo(0, 0)
        ctx.rotate((((360 / length) * i - rotateDeg) * Math.PI) / 180)
        ctx.arc(0, 0, 250, 0, (2 * Math.PI) / length, false)
        ctx.fillStyle = i % 2 === 0 ? '#add8e6' : '#ffffff'
        ctx.fill()
        ctx.restore()
      }
    },
    [id],
  )

  useEffect(() => {
    void drawWheel(prizes)
  }, [drawWheel, prizes])

  return (
    <Flex flex={1}>
      <Flex
        alignItems={'center'}
        flexDirection={'column'}
        id={id}
        position={'relative'}
        w={'full'}
      >
        <Center
          ref={arrowRef}
          className={'arrow'}
          position={'absolute'}
          zIndex={2}
        >
          <IconArrowWheel />
        </Center>
        <Flex
          ref={containerRef}
          __css={styleRotate?.deg !== DEFAULT_DEG ? styleWheel : {}}
          className={'wheel'}
          css={{
            '& > canvas': {
              width: 'inherit',
              height: 'inherit',
            },
          }}
          flexDirection={'column'}
          position={'absolute'}
        >
          <canvas ref={wheelRef} height={'500px'} width={'500px'} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export const LuckyWheel = memo(Component)
