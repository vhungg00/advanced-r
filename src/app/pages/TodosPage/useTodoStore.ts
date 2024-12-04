import create from 'zustand'
import { nanoid } from 'nanoid'
import { TodoItem } from './types'

type TodoState = {
  todos: TodoItem[]
  addTodo: (todoText: string) => void
}

const initialState = [
  {
    id: nanoid(),
    text: 'Hello',
  },
] as TodoItem[]

const useTodoStore = create<TodoState>(set => ({
  todos: initialState,
  addTodo: (todoText: string) => {
    set(state => ({
      todos: [
        ...state.todos,
        {
          text: todoText,
          id: nanoid(),
        },
      ],
    }))
  },
  // In our example we only need to fetch the users, but you'd probably want to define other methods here
  updateTodo: (todo: TodoItem) => {
    console.log(todo)
  },
  deleteTodo: (id: string) => {
    console.log(id)
  },
}))

export { useTodoStore }
