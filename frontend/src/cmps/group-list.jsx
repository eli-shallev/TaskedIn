import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { GroupPreview } from "./group-preview.jsx";
import { updateDrag } from "../store/board.actions";

export function GroupList({ groups, board, setQuickEdit, quickEdit }) {
  function handleOnDragEnd(result) {
    const { source, destination } = result;
    if (
      !result.destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;
    result.board = board;
    updateDrag(result);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable
        droppableId={board._id || "board"}
        direction="horizontal"
        type="GROUP"
      >
        {(provided) => (
          <ul
            className="group-list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {groups?.map((group, index) => {
              return (
                <Draggable
                  key={group._id}
                  draggableId={group._id}
                  index={index}
                >
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className="li-group"
                    >
                      <GroupPreview
                        group={group}
                        board={board}
                        quickEdit={quickEdit}
                        setQuickEdit={setQuickEdit}
                      />
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
