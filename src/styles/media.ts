/*
 * Media queries utility
 */

/*
 * Inspired by https://github.com/DefinitelyTyped/DefinitelyTyped/issues/32914
 */

// Update your breakpoints if you want
export const sizes = {
  small: 600,
  medium: 1024,
  large: 1440,
  xlarge: 1920,
}

// Iterate through the sizes and create min-width media queries
export const media = (Object.keys(sizes) as Array<keyof typeof sizes>).reduce(
  (_acc, _size) => {
    _acc[_size] = () => `@media (min-width:${sizes[_size]}px)`
    return _acc
  },
  {} as { [key in keyof typeof sizes]: () => string },
)

/* Example
const SomeDiv = styled.div`
  display: flex;
  ....
  ${media.medium} {
    display: block
  }
`;
*/
