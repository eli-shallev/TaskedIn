import React from "react";
import { useState } from "react";
import { updateTask } from "../../store/actions/task.actions";
import { TaskDetailsModal } from "../../cmps/task-details-modal";
import { QuickEditButtons } from "./quick-edit-buttons";

export function QuickEdit({ board, setQuickEdit, pos, task, groupId }) {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDetailsModal, setTaskDetailsModal] = useState(null);

  function handleChange({ target }) {
    setTaskTitle(target.value);
  }

  function saveTask() {
    task.title = taskTitle;
    setQuickEdit(null);
    updateTask(task, groupId, board);
  }

  function onUpdateTask(task) {
    updateTask(task, groupId, board);
  }

  if(!pos) return
  const modalPos = { top: pos.top + "px", left: pos.left + "px" };

  return (
    <React.Fragment>
      <section
        className="quick-edit"
        style={modalPos}
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <section className="main-edit">
          <textarea
            value={taskTitle}
            autoFocus={window.innerWidth >= 1200}
            onFocus={(ev) => ev.target.select()}
            onChange={handleChange}
          ></textarea>
          <button onClick={saveTask} className="btn blue">
            Save
          </button>
        </section>
        <QuickEditButtons
          board={board}
          task={task}
          groupId={groupId}
          setQuickEdit={setQuickEdit}
          taskDetailsModal={taskDetailsModal}
          setTaskDetailsModal={setTaskDetailsModal}
        />
      </section>
      <section
        className="screen-edit"
        onClick={(ev) => {
          ev.preventDefault();
          setQuickEdit(null);
        }}
      ></section>
      {taskDetailsModal && (
        <TaskDetailsModal
          board={board}
          setTaskDetailsModal={setTaskDetailsModal}
          data={taskDetailsModal}
          groupId={groupId}
          task={task}
          onUpdateTask={onUpdateTask}
          setQuickEdit={setQuickEdit}
        />
      )}
    </React.Fragment>
  );
}
