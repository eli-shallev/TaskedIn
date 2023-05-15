import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";

import { TaskPreview } from "./task-preview.jsx";
import { groupService } from "../services/group.service.local";
import { utilService } from "../services/util.service";
import { AddTask } from "./add-task.jsx";
import { taskService } from "../services/task.service.local.js";

export function TaskList({
  groupTasks,
  groupId,
  board,
  quickEdit,
  setQuickEdit,
}) {
  return (
    <Droppable droppableId={groupId} type="TASK">
      {(provided) => (
        <div
          className="task-list"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          {groupTasks.map((task, index) => (
            <TaskPreview
              board={board}
              key={task._id}
              task={task}
              groupId={groupId}
              index={index}
              quickEdit={quickEdit}
              setQuickEdit={setQuickEdit}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
