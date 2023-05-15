import React from "react";
import { GrTextAlignFull } from "react-icons/gr";
import { BsCheck2Square } from "react-icons/bs";
import { FiPaperclip } from 'react-icons/fi'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { TbCheckbox } from 'react-icons/tb'
import { BiCheckbox } from 'react-icons/bi'
import { updateTask } from "../store/actions/task.actions";
import { utilService } from "../services/util.service";

export function TaskPreviewIcons({ task, groupId, board }) {
  const boardMembers = board.members;
  const membersToShow = boardMembers
    ? boardMembers.filter((member) => task.memberIds?.includes(member._id))
    : [];

    function getDateClass(task) {
    if (task?.dueDate?.isDone) {
      return 'completed';
    }

    const then = new Date(task?.dueDate?.date);
    const now = new Date();
    const msBetweenDates = then.getTime() - now.getTime();
    const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

    if (hoursBetweenDates < 0) {
      return 'overdue';
    }
    if (hoursBetweenDates < 24) {
      return 'duesoon';
    }
  }


  function checklistTodosPreview() {
    if (!task.checklists || task.checklists.length === 0) return;
    const todosLength = task.checklists.reduce((a, b) => a + b.todos.length, 0);
    const doneTodosLength = task.checklists.reduce(
      (a, b) => a + b.todos.filter((todo) => todo.isDone).length,
      0
    );
    return { doneTodosLength, todosLength };
  }

  function onToggleIsDone(ev, task) {
    ev.preventDefault();
    task.dueDate.isDone = !task.dueDate.isDone;
    updateTask(task, groupId, board);
  }

  const checklistTodosDetails = checklistTodosPreview();

  return (
    <section className="task-preview-icons">
      <section className="task-left-icons">
      {task.dueDate && (
          <section className={`date-container ${getDateClass(task)}`} onClick={(ev) => onToggleIsDone(ev, task)}>
            <span className="clock-icon">
              <AiOutlineClockCircle />
            </span>
            <span className="done-checkbox-icon">
              <TbCheckbox />
            </span>
            <span className="checkbox-icon">
              <BiCheckbox />
            </span>
            <span>{utilService.dueDateFormat(task.dueDate.date)}</span>
          </section>
        )}
        {task.description && (
          <section className="attachments-icon">
            <GrTextAlignFull />
          </section>
        )}
        {task.attachments && task.attachments.length !== 0 && (
          <section className="attachments-icon">
            <FiPaperclip />
            {task.attachments.length}
          </section>
        )}
        {task.checklists &&
          task.checklists.length !== 0 &&
          (checklistTodosDetails.doneTodosLength !== 0 ||
            checklistTodosDetails.todosLength !== 0) && (
            <section
              className={`attachments-icon ${
                checklistTodosDetails.doneTodosLength ===
                checklistTodosDetails.todosLength
                  ? "done"
                  : ""
              }`}
            >
              <BsCheck2Square />
              {`${checklistTodosDetails.doneTodosLength}/${checklistTodosDetails.todosLength}`}
            </section>
          )}
      </section>
      {task.memberIds && task.memberIds.length !== 0 && (
        <section className={`members-img `}>
          {membersToShow.map((member) => (
            <div className="member-img" key={member._id}>
              <img src={member.imgUrl} alt="member-img" />
            </div>
          ))}
        </section>
      )}
    </section>
  );
}
