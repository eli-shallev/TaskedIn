
import React, { useEffect, useState } from "react";
import { addTask } from "../store/actions/task.actions";
import { AiOutlineClose } from "react-icons/ai";

export function AddTask({ onToggleAddModal, groupId, board, tasks }) {
  const [title, setTitle] = useState("");

  const handleChange = ({ target }) => {
    setTitle(target.value);
  };


  async function onAdd(ev) {
    ev.preventDefault();
    if (!title) return;
    try {
      const savedTask = await addTask(title, groupId, board);
      tasks.push(savedTask);
      setTitle("");
    } catch (error) {
      console.log("Cannot add task", error);
      throw error;
    }
  }

  return (
    <section className="add-task">
      <form onSubmit={onAdd}>
        <textarea
          value={title}
          type="text"
          placeholder="Enter a title for this card..."
          onChange={handleChange}
          required
          autoFocus
        />
        <button className="btn-add-task" type="submit">
          Add card
        </button>
        <button onClick={onToggleAddModal} className="btn-close-modal">
          <AiOutlineClose />
        </button>
      </form>
    </section>
  );
}
