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

export const addClass = (element: HTMLElement, className: string) => {
  if (element.className.includes(className)) return
  element.className += ` ${className}`
}

export const removeClass = (element: HTMLElement, className: string) => {
  if (!element.className.includes(className)) return
  element.className = element.className
    ?.split(className)
    .map(e => e.trim())
    .join(' ')
    .trim()
}

export const toggleClass = (element: HTMLElement, className: string) => {
  if (element.className.includes(className)) {
    return removeClass(element, className)
  }
  return addClass(element, className)
}

export const sleep = (delayInMS: number) => {
  return new Promise(resolve => setTimeout(resolve, delayInMS))
}

export const base64ToFile = (base64: string, fileName: string): File => {
  const imageContent = atob(base64.split(',')[1])
  const buffer = new ArrayBuffer(imageContent.length)
  const view = new Uint8Array(buffer)
  for (let n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n)
  }
  const type = 'image/jpeg'
  const blob = new Blob([buffer], { type })
  return new File([blob], fileName, {
    lastModified: new Date().getTime(),
    type,
  })
}

export const getUrlWithFilePath = (path: string) => {
  if (path.startsWith('http')) return path
  return `${import.meta.env.VITE_APP_API_URL}/api/assets/${path}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isLastArray = (array: any[], index: number) => {
  return array.length - 1 === index
}

export const regexFormatPhone = (phone?: string) => {
  if (phone?.startsWith('+')) {
    return (
      `+${phone.replace(/\D/g, '')}`.replace(
        /(\d{2})(\d{3})(\d{3})(\d{3})/,
        '$1 $2 $3 $4',
      ) || ''
    )
  }
  return (
    phone?.replace(/\D/g, '')?.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3') ||
    ''
  )
}
