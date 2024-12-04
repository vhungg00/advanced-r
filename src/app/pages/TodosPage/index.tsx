import { useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { Button } from 'app/components/elements/Button'
import styled from '@emotion/styled'
import { useTodoStore } from './useTodoStore'
import { TodoItem } from './types'

/**
 * @returns Component Todos Page
 */
export function TodosPage() {
  const todoStore = useTodoStore()

  const handleAddTodo = useCallback(() => {
    todoStore.addTodo('Hello todo!')
  }, [todoStore])

  return (
    <Wrapper>
      <Helmet>
        <title>Todo Page</title>
        <meta content="A Boilerplate application homepage" name="description" />
      </Helmet>
      <div>
        <div>
          <Button onClick={handleAddTodo}>Add todo</Button>
        </div>
        <ul>
          {todoStore.todos.map((item: TodoItem) => {
            return <li key={item.id}>{item.text}</li>
          })}
        </ul>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
`
