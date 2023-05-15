import React, { useRef } from "react";
import { updateTask } from "../../store/actions/task.actions";
import { MdKeyboardArrowDown } from 'react-icons/md'
import { utilService } from "../../services/util.service";


export function TaskDatesSubheader({ task, groupId, onOpenModal, board }) {
    
  const datesBtnRef = useRef();

  function getDueMsg(task) {
    if (task.dueDate.isDone) {
      return <span className="due-msg completed">completed</span>;
    }
    const then = new Date(task.dueDate.date);
    const now = new Date();
    const msBetweenDates = then.getTime() - now.getTime();
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
    if (hoursBetweenDates < 0) {
      return <span className="due-msg overdue">overdue</span>;
    }
    if (hoursBetweenDates < 24) {
      return <span className="due-msg soon">due soon</span>;
    }
  }

  function handleChange({ target }) {
    if (target.type === "checkbox") {
      if (target.checked) task.dueDate.isDone = true;
      else if (!target.checked) {
        task.dueDate.isDone = false;
      }
      updateTask(task, groupId, board)
    }
  }

  return (
    <div className="task-dates-subheader">
      <h3 className="task-dates-subheader-title">Due Date</h3>
      <div className="due-date-badge">
        <label htmlFor="date-overview" className="checkbox-container">
          <input
            id="date-overview"
            type="checkbox"
            onChange={handleChange}
            checked={task.dueDate.isDone}
            className="checkbox"
          />
          <span className="checkmark"></span>
        </label>
        <div className="due-date-container">
          <button
            onClick={() => onOpenModal("Dates", datesBtnRef)}
            ref={datesBtnRef}
          >
            <span>{utilService.dueDateTimeFormat(task.dueDate.date)}</span>
            {getDueMsg(task)}
            <MdKeyboardArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
}
