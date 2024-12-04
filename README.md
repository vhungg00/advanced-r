# Reactjs boilerplate

# Structure folder

```code
└── src/
    ├── app/
    │   │   # Routers for app
    │   │── index.tsx
    │   │
    │   │   # Components common definitions
    │   │── components
    │   │   │
    │   │   │  # Stateless components that are reusable, These components can’t use state , hook , or context
    │   │   ├── elements
    │   │   │
    │   │   │  # Stateful components that are supposed to be reused in multiple pages. These components can depend on modules or elements.
    │   │   └── modules
    │   │
    │   └── pages/
    │       ├── HomePage
    │       │   │
    │       │   ├── components
    │       │   │   │  # Stateless components use only for Home Page
    │       │   │   ├── elements
    │       │   │   │
    │       │   │   │ # Stateful components use only for Home Page
    │       │   │   └── modules
    │       │   │
    │       │   │  # Define Zustand store
    │       │   ├── use{Name}Store
    │       │   │
    │       │   │  # Define i18n for home page
    │       │   └── messages.ts
    │       │
    │       └── NotFoundPage
    ├── contexts/
    │   │   # React context files
    │   └── TodoListContext.ts
    │
    ├── store/
    │   │   # Zustand common app store
    │   └── useAuthStore.ts
    │
    ├── styles/
    │   │   # Style common definitions
    │   └── global-styles.js
    │
    ├── types/
    │   │   # Type definitions
    │   └── RootState.ts
    │
    ├── utils/
    │   │   # Utility functions
    │   └── messages.ts
    │
    └── hooks/
        │
        │   # React hooks common
        └── useRouter.ts
```

### Before run app please copy file `.env.development` -> `env.local`

- See more https://create-react-app.dev/docs/adding-custom-environment-variables/

# Optional handle catch error in app pls using [sentry.io](https://sentry.io/)

# State management
https://github.com/pmndrs/zustand

# Add comment docs

## Please see https://eslint.org/docs/latest/rules/valid-jsdoc

### Eg:

```tsx
/**
 * Add two numbers.
 * @param {number} num1 The first number.
 * @param {number} num2 The second number.
 * @returns {number} The sum of the two numbers.
 */
function add(num1, num2) {
  return num1 + num2
}
```

# Coding conventions

## Naming

- **Filename** Use PascalCase for filenames. E.g., ReservationCard.tsx.
- **Reference Naming**: Use PascalCase for React components and camelCase for their instances.

```tsx
// bad
import reservationCard from './ReservationCard'

// good
import { ReservationCard } from './ReservationCard'

// bad
const ReservationItem = <ReservationCard />

// good
const reservationItem = <ReservationCard />
```

- **Component Naming** Use the filename as the component name. For example, ReservationCard.tsx should have a reference name of ReservationCard. However, for root components of a directory, use index.tsx as the filename and use the directory name as the component name:

```tsx
// bad
import Footer from './Footer/Footer'

// bad
import Footer from './Footer/index'

// bad because don't use export default for components
import Footer from './Footer'

// good
import { Footer } from './Footer'
```

- **Props Naming**: Avoid using DOM component prop names for different purposes.
  > Why? People expect props like `style` and `className` to mean one specific thing. Varying this API for a subset of your app makes the code less readable and less maintainable, and may cause bugs.

```tsx
// bad
<MyComponent style="fancy" />

// bad
<MyComponent className="fancy" />

// good
<MyComponent variant="fancy" />
```

**File names** Directories and files must be named in camel cases. Except

- front/pages (page URLs are in snake cases.)
- front/components (component file names are in PascalCase.)

## Props

- Always use camelCase for prop names, or PascalCase if the prop value is a React component.

```tsx
// bad
<Foo
  UserName="hello"
  phone_number={12345678}
/>

// good
<Foo
  userName="hello"
  phoneNumber={12345678}
  Component={SomeComponent}
/>
```

- Omit the value of the prop when it is explicitly true. eslint: react/jsx-boolean-value

```tsx
// bad
<Foo
  hidden={true}
/>

// good
<Foo
  hidden
/>

// good
<Foo hidden />
```

- Always include an alt prop on <img> tags. If the image is presentational, alt can be an empty string or the <img> must have role="presentation". eslint: jsx-a11y/alt-text

```tsx
// bad
<img src="hello.jpg" />

// good
<img src="hello.jpg" alt="Me waving hello" />

// good
<img src="hello.jpg" alt="" />

// good
<img src="hello.jpg" role="presentation" />
```

- Avoid using an array index as `key` prop, prefer a stable ID. eslint: [`react/no-array-index-key`](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md)

> Why? Not using a stable ID [is an anti-pattern](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) because it can negatively impact performance and cause issues with component state.

We don’t recommend using indexes for keys if the order of items may change.

```tsx
// bad
{
  todos.map((todo, index) => <Todo {...todo} key={index} />)
}

// good
{
  todos.map(todo => <Todo {...todo} key={todo.id} />)
}
```

# Tech Stack

## Core

- React
- React Router
- Zustand
- Styled Components
- Typescript
- React-i18next

## Unit Testing

- Jest
- react-testing-library

## Linting

- ESLint
- Prettier
- Stylelint
- Husky
