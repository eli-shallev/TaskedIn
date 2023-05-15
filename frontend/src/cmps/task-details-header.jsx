import React, { useState } from "react";
import { GrCreditCard } from "react-icons/gr";
import { groupService } from "../services/group.service.local";
import { updateTask } from "../store/actions/task.actions";



export function TaskDetailsHeader({ task, groupId, groupTitle, board }) {
  
  const [textTitle, setTextTitle] = useState(task.title)

  function handleChange({ target }) {
    let { value } = target
    setTextTitle(value)
}

  function setTaskTitle() {
    task.title = textTitle
    updateTask(task, groupId, board)
  }
  

  return (
    <section className="task-details-header">
      <input type="text" value={textTitle} onChange={handleChange} onBlur={setTaskTitle}/>
      <div className="sub-title">
        in list &nbsp;
        <span className="task-group-title">{groupTitle}</span>
      </div>
      <GrCreditCard className="header-icon" />
    </section>
  );
}
