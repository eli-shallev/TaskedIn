import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { BsPerson, BsCheck2Square, BsSquareHalf } from "react-icons/bs";
import { AiOutlineTag, AiOutlineClockCircle } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import { GoArchive } from "react-icons/go";
import { IoLocationSharp } from "react-icons/io5";
import { removeTask } from "../store/actions/task.actions.js";

export function TaskDetailsSidebar({
  task,
  taskId,
  groupId,
  board,
  onOpenModal,
}) {
  const navigate = useNavigate();
  const checklistBtnRef = useRef();
  const attachmentBtnRef = useRef();
  const datesBtnRef = useRef();
  const membersBtnRef = useRef();
  const labelsBtnRef = useRef();
  const coverBtnRef = useRef();

  function onRemoveTask(ev) {
    ev.preventDefault();
    removeTask(taskId, groupId, board);
    navigate(-1);
  }

  return (
    <section className="task-sidebar">
      <h3 className="sidebar-title">Add to card</h3>
      <div className="btn-container">
        <button
          ref={membersBtnRef}
          onClick={() => onOpenModal("Members", membersBtnRef)}
        >
          <BsPerson className="icon" />
          Members
        </button>
        <button
          ref={labelsBtnRef}
          onClick={() => onOpenModal("Labels", labelsBtnRef)}
        >
          <AiOutlineTag className="icon" />
          Labels
        </button>

        <button
          ref={checklistBtnRef}
          onClick={() => onOpenModal("Checklist", checklistBtnRef)}
        >
          <BsCheck2Square className="icon" />
          Checklist
        </button>
        <button
          ref={datesBtnRef}
          onClick={() => onOpenModal("Dates", datesBtnRef)}
        >
          <AiOutlineClockCircle className="icon" />
          Dates
        </button>
        <button
          ref={attachmentBtnRef}
          onClick={() => onOpenModal("Attachment", attachmentBtnRef)}
        >
          <ImAttachment className="icon" />
          Attachment
        </button>
        {/* <button>
          <IoLocationSharp className="icon" />
          Location
        </button> */}
        {!task?.cover && (
          <button
            ref={coverBtnRef}
            onClick={() => onOpenModal("Cover", coverBtnRef)}
          >
            <BsSquareHalf
              className="icon"
              style={{
                transform: "rotate(0.75turn) translateY(-20%) translateX(22%)",
              }}
            />
            Cover
          </button>
        )}

        <button onClick={onRemoveTask} className="btn-sidebar">
          <GoArchive className="icon" />
          Delete
        </button>
      </div>
    </section>
  );
}
