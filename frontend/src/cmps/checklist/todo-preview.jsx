import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { EditTitle } from "./edit-title";

export function TodoPreview({ todo, checkListId, updateTodo, removeTodo }) {
  const [isEditTitleOpen, setIsEditTitleOpen] = useState(false)

  function toggleTitleEdit() {
    setIsEditTitleOpen(!isEditTitleOpen)
  }

  function onChangeTodoDone() {
    todo.isDone = !todo.isDone
    updateTodo(todo, checkListId)
  }

  function editTitle (title) {
    todo.title = title
    updateTodo(todo, checkListId)
  }

  function onRemoveTodo (ev) {
    ev.stopPropagation()
    removeTodo(todo._id, checkListId)
  }

  return (
    <section className={`todo-preview ${isEditTitleOpen? 'edit-open':''}`}>
    <label htmlFor={todo._id} className="checkbox-container">
      <input className='checkbox' id={todo._id} type="checkbox" checked={todo.isDone} onChange={onChangeTodoDone} />
      <span className="checkmark"></span>
    </label>

    {isEditTitleOpen ? (
      <EditTitle itemTitle={todo.title} editTitle={editTitle} toggleTitleEdit={toggleTitleEdit} />
    ) : (
      <section className="title" onClick={toggleTitleEdit}>
        <p className={todo.isDone ? 'crossed-out' : ''}>{todo.title}</p>
        <button className="btn-close" onClick={onRemoveTodo}>
          <BsThreeDots />
        </button>
      </section>
    )}
  </section>
  )
}
