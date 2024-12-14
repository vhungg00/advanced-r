import { FC, memo, useCallback, useEffect, useRef } from 'react'
import { Box, Center, ChakraProps, useTheme } from '@chakra-ui/react'
import { Prizes } from 'services/luckyWheelServices'
import { images } from 'assets'
import { StyleRotate } from '../const/types'

type Props = {
  id: string
  styleRotate: StyleRotate
  prizes: Prizes[]
  timeNeedleRotate: number
  spinning: boolean
}

const Component: FC<Props> = props => {
  const DEFAULT_DEG = 0
  const arrowRef = useRef<HTMLDivElement | null>(null)
  const wheelRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const animationFrameId = useRef<number | null>(null)
  const { id, styleRotate, spinning, timeNeedleRotate = 1, prizes } = props

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
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 300)
        if (i % 2 === 0) {
          gradient.addColorStop(0, theme.colors.blue[500])
          gradient.addColorStop(1, theme.colors.blue[100])
        } else {
          gradient.addColorStop(0, theme.colors.gray[500])
          gradient.addColorStop(1, theme.colors.white)
        }

        ctx.fillStyle = gradient
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
    const rotateArrow = () => {
      if (!arrowRef.current) return

      if (spinning && timeNeedleRotate) {
        arrowRef.current.style.animation = `rotate ${timeNeedleRotate}s linear infinite`
        animationFrameId.current = requestAnimationFrame(rotateArrow)
      } else {
        arrowRef.current.style.animation = ''
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current)
          animationFrameId.current = null
        }
      }
    }

    rotateArrow()

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [spinning, timeNeedleRotate])

  useEffect(() => {
    void drawWheel(prizes)
  }, [drawWheel, prizes])

  return (
    <Box>
      <Box m={'30px auto'} maxW={'600px'}>
        <Box id={id} position={'relative'} pb={'100%'}>
          <Center
            __css={{
              '& > img': {
                width: '50%',
              },
            }}
            left={'50%'}
            position={'absolute'}
            top={'-1%'}
            transform={'translateX(-50%)'}
            w={'12%'}
            zIndex={10}
          >
            <Box ref={arrowRef} transformOrigin={'center'}>
              <img alt="lucky-arrow" src={images.imageLuckyArrow} />
            </Box>
          </Center>
          <Center
            backgroundColor={'white'}
            borderRadius={'50%'}
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
              alt="lucky-logo-mini-game"
              src={images.imageLogoMiniGame}
              style={{ width: '100%' }}
            />
          </Center>
          <img
            src={images.imageWheelBorder}
            style={{ position: 'absolute', zIndex: '8' }}
          />
          <Box
            alignItems={'center'}
            display={'flex'}
            justifyContent={'center'}
            left={'50%'}
            position={'absolute'}
            top={'50%'}
            transform={'translate(-50%, -50%)'}
            w={'87%'}
          >
            <Box
              ref={containerRef}
              __css={styleRotate?.deg !== DEFAULT_DEG ? styleWheel : {}}
              className={'wheel'}
              h={'full'}
              sx={{
                '&> canvas': {
                  width: 'inherit',
                  height: 'inherit',
                  borderRadius: '50%',
                },
              }}
              w={'full'}
            >
              <canvas ref={wheelRef} height={'500px'} width={'500px'} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export const LuckyWheel = memo(Component)
