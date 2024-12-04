const ratio = 4

interface ISpace {
  [key: string]: string | number
}

export const space: ISpace = {
  px: '1px',
}

for (let i = 0; i <= 100; i = i + 0.5) {
  space[i] = `${i * ratio}px`
}
