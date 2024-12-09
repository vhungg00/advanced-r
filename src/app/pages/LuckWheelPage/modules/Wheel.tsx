import { FC, memo, useCallback, useEffect, useMemo, useRef } from 'react'
import {
  Box,
  Center,
  ChakraProps,
  Flex,
  ListItem,
  useTheme,
} from '@chakra-ui/react'
import { IconArrowWheel } from 'app/components/elements/Icons/IconArrowWheel'
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

  const generateHTMLString = (
    i: number,
    turnNum: number,
    length: number,
    prizeList: Prizes[],
  ) => `
        <li>
          <div class="inner" style="transform: rotate(${i * turnNum}turn); width: ${
            (100 / length) * 2 - 2
          }%" >
            <div class="content">
              <img src="${prizeList[i].image}" style="margin: 0 auto" />
              <div class="text-wrap">
                <p class="name-prize" style="margin-top: 5px">${prizeList[i].name}</p>
              </div>
            </div>
          </div>
        </li>`

  // function to drawl lucky wheel with canvas
  const drawWheel = useCallback(
    (prizes: Prizes[]) => {
      const length = prizes?.length
      const rotateDeg = 360 / length / 2 + 90
      const turnNum = 1 / length
      const html = []

      const ulElementFirstRender = document.getElementsByTagName('ul')[0]

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
        ctx.fillStyle =
          i % 2 === 0 ? `${theme.colors.blue[100]}` : `${theme.colors.white}`
        ctx.fill()
        ctx.restore()
        const htmlString = generateHTMLString(i, turnNum, length, prizeList)
        html.push(htmlString)
      }
      containerRef?.current.appendChild(prizeItems)
      prizeItems.innerHTML = html.join('')
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
        borderRadius={'50%'}
        flexDirection={'column'}
        height={'600px'}
        id={id}
        position={'relative'}
        w={'600px'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Center
          ref={arrowRef}
          className={'arrow'}
          position={'absolute'}
          zIndex={2}
        >
          <IconArrowWheel />
        </Center>
        <img
          style={{ position: 'absolute', width: '100%', top: '0', left: '0' }}
          src={images.imageWheelBorder}
          alt={'wheel-border'}
        />
        <WrapperWheel
          ref={containerRef}
          __css={styleRotate?.deg !== DEFAULT_DEG ? styleWheel : {}}
          className={'wheel'}
          flexDirection={'column'}
          h={'520px'}
          w={'520px'}
          position={'relative'}
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
  & ul {
    position: absolute;
    left: 0;
    top: 0;
    width: inherit;
    height: inherit;
    z-index: 2;
  }
  & ul,
  & li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  & ul li {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-weight: bold;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.6);
    > .inner {
      position: relative;
      display: block;
      top: -10px;
      padding-top: 30px;
      margin: 0 auto;
      text-align: center;
      -webkit-transform-origin: 50% 270px;
      -ms-transform-origin: 50% 270px;
      transform-origin: 50% 270px;
    }
    .inner .content {
      flex-direction: column;
      align-items: center;
    }
    .inner .content .text-wrap {
      justify-content: center;
      width: 80px;
      margin: 0 auto;
    }
  }
`
