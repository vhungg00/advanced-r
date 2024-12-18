import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

type User = {
  name: string
  age: number
}

type UserContextValue = {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}

const defaultValue: UserContextValue = {
  user: { name: '', age: 0 },
  setUser: () => {},
}

const UserContext = createContext<UserContextValue>(defaultValue)

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({ name: 'John Doe', age: 25 })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

const Profile: React.FC<UserContextValue> = ({ user, setUser }) => {
  return (
    <div>
      <h1>Username: {user.name}</h1>
      <button onClick={() => setUser({ ...user, name: 'Jane Doe' })}>
        Change Name
      </button>
    </div>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const withUser = <P extends object>(
  WrappedComponent: React.ComponentType<P & UserContextValue>,
) => {
  return (props: P) => (
    <UserContext.Consumer>
      {context => {
        console.log(context)

        return <WrappedComponent {...props} {...context} />
      }}
    </UserContext.Consumer>
  )
}

export const ProfileWithUser = withUser(Profile)
