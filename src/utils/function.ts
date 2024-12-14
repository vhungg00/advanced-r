import { Dayjs } from 'dayjs'

export function formatLargeNumber(value: string) {
  const valueEmpty = ''
  if (value === valueEmpty) return '・・・ '
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const getTimeDifference = (
  timeStartSpin: Dayjs,
  timeStopSpin: Dayjs,
) => {
  return timeStopSpin.diff(timeStartSpin, 'seconds')
}
