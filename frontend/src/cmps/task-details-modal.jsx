import React, { useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Attachment } from "./attachments/attachment";
import { CheckList } from "./checklist/check-list";
import { TaskCover } from "./cover/task-cover";
import { Dates } from "./Dates/dates";
import { Labels } from "./labels/labels";
import { TaskMembers } from "./members/task-members";

export function TaskDetailsModal({
  task,
  groupId,
  setTaskDetailsModal,
  setQuickEditModal,
  data,
  board,
  setQuickEdit
}) {
  const [isEditLabels, setIsEditLabels] = useState(null);

  function onToggleLabelEdit() {
    setIsEditLabels((prevState) => !prevState);
  }

  const { type, pos } = data;
  const modalStyle = { left: pos.left + "px", top: pos.bottom + "px" };
  if (pos.right) {
    delete modalStyle.left;
    modalStyle.right = pos.right;
  }

  function getDynModal(type) {
    switch (type) {
      case "Checklist":
        return (
          <CheckList
            board={board}
            task={task}
            groupId={groupId}
            setTaskDetailsModal={setTaskDetailsModal}
          />
        );
      case "Members":
        return (
          <TaskMembers
          setQuickEditModal={setQuickEditModal}
          setQuickEdit={setQuickEdit}
            board={board}
            task={task}
            groupId={groupId}
            setTaskDetailsModal={setTaskDetailsModal}
          />
        );
      case "Labels":
        return (
          <Labels
          setQuickEdit={setQuickEdit}
            task={task}
            groupId={groupId}
            board={board}
            onToggleLabelEdit={onToggleLabelEdit}
            isEditLabels={isEditLabels}
          />
        );
      case "Attachment":
        return (
          <Attachment
            task={task}
            setTaskDetailsModal={setTaskDetailsModal}
            groupId={groupId}
            board={board}
          />
        );
      case "Cover":
        return (
          <TaskCover
          setQuickEdit={setQuickEdit}
            board={board}
            task={task}
            groupId={groupId}
            setTaskDetailsModal={setTaskDetailsModal}
          />
        );
      case "Dates":
        return (
          <Dates
            board={board}
            task={task}
            groupId={groupId}
            setTaskDetailsModal={setTaskDetailsModal}
          />
        );

      default:
        return;
    }
  }

  function getModalTitle() {
    switch (type) {
      case "Checklist":
        return "Add checklist";
      case "Members":
        return "Members";
      case "Labels":
        return "Labels";
      case "Cover":
        return "Cover";
      case "Attachment":
        return "Attach from...";
      default:
        return type;
    }
  }

  const title = getModalTitle();

  function handleBlur({ relatedTarget }) {
    if (type === 'Attachment' || type === 'Cover') return
      if (!relatedTarget) {
        setTaskDetailsModal(null)
      }
  }

  return (
    <section
      tabIndex="0"
      onBlur={handleBlur}
      className="task-details-modal"
      style={modalStyle}
    >
      {title && (
        <div className="task-modal-title">
          <p>{title}</p>
          <span>
            <IoCloseOutline
              onClick={(ev) => {
                ev.preventDefault();
                setTaskDetailsModal(null);
              }}
            />
          </span>
        </div>
      )}
      {getDynModal(type)}
    </section>
  );
}
