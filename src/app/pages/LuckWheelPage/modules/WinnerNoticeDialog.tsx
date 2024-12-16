import { FC, useEffect, useRef } from 'react'
import { Flex, Text, Button } from '@chakra-ui/react'
import { Body, Dialog, Header } from 'app/components/modules/Dialog'
import { WinningResult } from '../const/types'
import JSConfetti from 'js-confetti'

type Props = {
  isOpen: boolean
  onClose: () => void
  winningResult?: WinningResult
}

export const WinnerNoticeDialog: FC<Props> = ({
  isOpen,
  onClose,
  winningResult,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const jsConfettiRef = useRef<JSConfetti | null>(null)
  useEffect(() => {
    if (!jsConfettiRef.current && canvasRef.current) {
      jsConfettiRef.current = new JSConfetti({ canvas: canvasRef.current })
    }
  }, [])
  useEffect(() => {
    if (isOpen && jsConfettiRef.current) {
      jsConfettiRef.current.addConfetti({
        confettiNumber: 500,
      })
    }
    return () => {
      jsConfettiRef.current?.clearCanvas()
    }
  }, [isOpen])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100dvw',
          height: '100dvh',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      <Dialog
        backgroundColor={'#f9f9f9'}
        borderRadius={'20px'}
        boxShadow={'0px 4px 20px rgba(0, 0, 0, 0.2)'}
        isOpen={isOpen}
      >
        <Header
          borderTopRadius={'20px'}
          justifyContent={'center'}
          py={3}
          styleIcon={{ display: 'none' }}
        >
          <Text
            fontSize={'18px'}
            fontWeight={'600'}
            textTransform={'uppercase'}
          >
            Phần quà của bạn
          </Text>
        </Header>

        <Body px={6} py={6}>
          <Flex align={'center'} direction={'column'} margin={'0 auto'}>
            <Text fontSize={'18px'} fontWeight={'500'} mb={2}>
              🎉 Xin chúc mừng! 🎉
            </Text>

            <Flex alignItems={'center'} pt={2} pb={6} textAlign={'center'}>
              <img
                alt="Gift"
                src={winningResult?.img}
                style={{ width: '120px', borderRadius: '10px' }}
              />
              <Text color={'gray.600'} fontSize={'16px'} textAlign={'left'}>
                Bạn vừa nhận được:
                <strong style={{ color: 'teal.500' }}>
                  {winningResult?.name || 'Phần quà bí mật'}
                </strong>
              </Text>
            </Flex>

            <Button
              _disabled={{ backgroundImage: '#dedede' }}
              _hover={{ backgroundColor: 'rgb(255, 182, 0)' }}
              backgroundColor={'#edbf41'}
              boxShadow={'0 3px 0 0 #c08900'}
              color={'white'}
              letterSpacing={'unset'}
              width={'60%'}
              onClick={() => {
                onClose()
              }}
            >
              Nhận quà ngay
            </Button>
          </Flex>
        </Body>
      </Dialog>
    </>
  )
}
