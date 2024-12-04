import create from 'zustand'

type ProfileType = {
  id: string
  name: string
  email: string
}

type AuthType = {
  token: string
  profile: ProfileType
}

const initialState = {
  token: '',
  profile: null,
}

const useAuthStore = create(set => ({
  auth: initialState,
  setAuth: (auth: AuthType) => {
    set(() => ({
      auth: auth,
    }))
  },
}))

export { useAuthStore }
