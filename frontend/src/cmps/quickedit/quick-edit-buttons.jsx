import React from "react";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { utilService } from "../../services/util.service";
import { removeTask } from "../../store/actions/task.actions";
import { BsPerson, BsSquareHalf } from 'react-icons/bs'
import { AiOutlineTag, AiOutlineClockCircle } from 'react-icons/ai'
import { BsCardHeading } from 'react-icons/bs'
import { GoArchive } from 'react-icons/go'


export function QuickEditButtons({
  board,
  task,
  groupId,
  setQuickEdit,
  taskDetailsModal,
  setTaskDetailsModal,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const datesBtnRef = useRef()
  const membersBtnRef = useRef()
  const labelsBtnRef = useRef()
  const coverBtnRef = useRef()

  const quickMenuBtns = [
    {
      type: "Labels",
      txt: "Edit labels",
      ref: labelsBtnRef,
      iconCmp: <AiOutlineTag className="icon" />,
    },
    {
      type: "Members",
      txt: "Change members",
      ref: membersBtnRef,
      iconCmp: <BsPerson className="icon" />,
    },
    {
      type: "Cover",
      txt: "Change cover",
      ref: coverBtnRef,
      iconCmp: (
        <BsSquareHalf
          className="icon"
          style={{
            transform: "rotate(0.25turn) translateY(-5%) translateX(10%)",
          }}
        />
      ),
    },
    {
      type: "Dates",
      txt: "Edit dates",
      ref: datesBtnRef,
      iconCmp: <AiOutlineClockCircle className="icon" />,
    },
  ];

  function onRemoveTask() {
    removeTask(task._id, groupId, board);
    setQuickEdit(null);
  }

  function onOpenQuickEditModal(ev, type, ref) {
    ev.preventDefault();
    if (taskDetailsModal?.type === type) return setTaskDetailsModal(null);
    const pos = utilService.getModalPosition(type, ref);
    setTaskDetailsModal({ type, pos });
  }

  function onOpenTaskDetails() {
    setQuickEdit(null);
    navigate(`${location.pathname}/${groupId}/${task._id}`);
  }
  return (
    <React.Fragment>
      <section className="quick-edit-buttons">
        <button onClick={onOpenTaskDetails} className="" key="Open card">
          <BsCardHeading />
          Open card
        </button>
        {quickMenuBtns.map((btn) => (
          <button
            className=""
            onClick={(ev) => onOpenQuickEditModal(ev, btn.type, btn.ref)}
            key={btn.type}
            ref={btn.ref}
          >
            {btn.iconCmp}
            {btn.txt}
          </button>
        ))}
        <button onClick={onRemoveTask} className="btn-sidebar">
          <GoArchive className="icon" />
          Delete
        </button>
      </section>
    </React.Fragment>
  );
}
