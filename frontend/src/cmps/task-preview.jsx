import React, { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { TaskLabelsList } from "./labels/task-label-list.jsx";
import { TaskPreviewIcons } from "./task-preview-icons.jsx";
import { Draggable } from "react-beautiful-dnd";
import { BsPencil } from 'react-icons/bs'

export function TaskPreview({
  task,
  groupId,
  board,
  onRemoveTask,
  index,
  quickEdit,
  setQuickEdit,
}) {
  const { taskId } = useParams();
  const taskPreviewRef = useRef();

  function isShowLabels() {
    if (task.labelIds && task.labelIds.length && task.labelIds !== 0)
      return true;
  }

  function toggleEditModal(ev, ref) {
    ev.stopPropagation()
    console.log(ref);
    if (quickEdit) return setQuickEdit(null);
    ev.stopPropagation();
    ev.preventDefault();
    const rect = ref.current.getBoundingClientRect()
    const pos = { top: rect.top - 8, left: rect.left - 2.5 };
    setQuickEdit({ pos, task, groupId });

  }

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div ref={taskPreviewRef}>
        <div
          className={`task-preview-container ${
            snapshot.isDragging ? "dragged" : ""
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Link  to={`${groupId}/${task._id}`} className={`task-preview`}>
            {task.cover && task.coverSize === "half" && (
              <div
                style={task.cover}
                className={`task-list-cover ${
                  task.cover.backgroundImage ? "img" : ""
                }`}
              ></div>
            )}
            <div
              style={task.cover && task.coverSize === "full" ? task.cover : {}}
              className={`task-title ${
                task.cover && task.coverSize === "full" ? "full" : ""
              } ${task.cover?.backgroundImage ? "img" : ""}`}
            >
              {isShowLabels() &&
                (!task.coverSize || task.coverSize === "half") && (
                  <TaskLabelsList labelIds={task.labelIds} board={board} />
                )}
              {task.title}
              {(!task.coverSize || task.coverSize === "half") && (
                <TaskPreviewIcons groupId={groupId} task={task} board={board} />
              )}
            </div>
            <section
              className="quick-edit-icon"
              onClick={(ev) => {
                toggleEditModal(ev, taskPreviewRef);
              }}
            >
              <BsPencil />
            </section>
          </Link>
        </div>
        </div>

      )}
    </Draggable>
  );
}
