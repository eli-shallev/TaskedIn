import React from "react";
import { updateTask, addTodo } from "../../store/actions/task.actions";
import { ChecklistPreview } from "./checklist-preview";

export function TaskCheckList({ task, groupId, board }) {
  function removeChecklist(checklistId) {
    task.checklists = task.checklists.filter(
      (checklist) => checklist._id !== checklistId
    );
    updateTask(task, groupId, board);
  }

  function updateChecklist(updatedChecklist) {
    task.checklists = task.checklists.filter((checklist) =>
      checklist._id === updatedChecklist._id ? updatedChecklist : checklist
    );
    updateTask(task, groupId, board);
  }

  function addNewTodo(title, checklistId) {
    addTodo(title, checklistId, task._id, groupId, board);
  }

  function removeTodo(todoId, checklistId) {
    const checkList = task.checklists.find(
      (checkList) => checkList._id === checklistId
    );
    checkList.todos = checkList.todos.filter((todo) => todo._id !== todoId);
    updateTask(task, groupId, board);
  }

  function updateTodo(editedTodo, checklistId) {
    const checkList = task.checklists.find(
      (checkList) => checkList._id === checklistId
    );
    checkList.todos = checkList.todos.filter((todo) =>
      todo._id === editedTodo._id ? editedTodo : todo
    );
    updateTask(task, groupId, board);
  }

  return (
    <section className="task-checklist">
      {task.checklists.map((checkList) => (
        <div key={checkList._id}>
          <ChecklistPreview
            removeChecklist={removeChecklist}
            updateChecklist={updateChecklist}
            addNewTodo={addNewTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
            checkList={checkList}
            
          />
        </div>
      ))}
    </section>
  );
}
