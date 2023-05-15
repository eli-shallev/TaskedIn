import React from "react";
import { useEffect, useRef, useState } from "react";

export function AddTodo({ addNewTodo, checkListId, closeModal }) {
  const [title, setTitle] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleChange({ target }) {
    setTitle(target.value);
  }

  function onAddTodo(ev) {
    ev.preventDefault();
    addNewTodo(title, checkListId);
    setTitle("");
    inputRef.current.focus();
  }

  function handleBlur({ relatedTarget }) {
    if (!relatedTarget) closeModal()
  }

  return (
    <section className="add-todo " onBlur={handleBlur}>
      <form onSubmit={onAddTodo}>
        <input
          className="input"
          placeholder="Add an item"
          value={title}
          onChange={handleChange}
          ref={inputRef}
        />
        <section className="options">
          <button tabIndex='0' className="btn-add-todo" type="submit">
            Add
          </button>
          <button className="btn-close" onClick={closeModal}>
            Cancel
          </button>
        </section>
      </form>
    </section>
  );
}
