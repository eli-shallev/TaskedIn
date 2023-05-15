import React from 'react'
import { TodoPreview } from './todo-preview'

export function TodoList({todos, checkListId, updateTodo, removeTodo}) {


  return (
    <section className="todo-list">
      {todos.map((todo) => (
        <TodoPreview
          key={todo._id}
          todo={todo}
          checkListId={checkListId}
          updateTodo={updateTodo}
          removeTodo={removeTodo}
        />
      ))}
    </section>
  )
}
