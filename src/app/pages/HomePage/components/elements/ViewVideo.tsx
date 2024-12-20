import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { Flex } from '@chakra-ui/react'
import video from 'assets/videos/download.mp4'
import { ViewVideoHandle } from 'app/pages/HomePage'

export const ViewVideo = forwardRef<ViewVideoHandle>((_, ref) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    console.log(ref)
  })

  useImperativeHandle(ref, () => ({
    play() {
      videoRef.current?.play()
    },
    pause() {
      videoRef.current?.pause()
    },
  }))

  return (
    <Flex>
      <video ref={videoRef} src={video} width={280} />
    </Flex>
  )
})
