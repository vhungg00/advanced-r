import { useCallback, useEffect, useRef, useState, Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { Flex } from '@chakra-ui/react'
import { Loading } from 'app/components/elements/Loading'
import { Prizes } from 'services/luckyWheelServices'
import { luckyWheelServices } from 'services'
import { LuckyWheel } from './modules/Wheel'

const ID_LUCKY_WHEEL = 'lucky-wheel'

export function LuckyWheelPage() {
  const isFetching = useRef<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [prizes, setPrizes] = useState<Prizes[]>([])

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

  return (
    <Fragment>
      <Helmet>
        <title>Lucky Wheel</title>
      </Helmet>
      <Loading isLoading={isLoading} />
      <Flex flex={1}>
        <LuckyWheel id={ID_LUCKY_WHEEL} prizes={prizes} />
      </Flex>
    </Fragment>
  )
}
