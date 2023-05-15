import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showErrorMsg } from "../services/event-bus.service.js";
import { GroupList } from "./group-list.jsx";
import { FiPlus } from "react-icons/fi";
import { GroupAdd } from "./group-add.jsx";
import { useSelector } from "react-redux";
import { loadBoards, setBoard } from "../store/board.actions.js";
import { TaskDetails } from "./task-details";
import { BoardHeader } from "./board-header.jsx";
import { QuickEdit } from "./quickedit/quick-edit.jsx";

export function BoardDetails() {
  const board = useSelector((storeState) => storeState.boardModule.currBoard);
  const filter = useSelector((storeState) => storeState.systemModule.filter);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [quickEdit, setQuickEdit] = useState(null)
  const { boardId, taskId } = useParams();

  useEffect(() => {
    setBoard(boardId);
    loadBoards();
  }, []);

  function onToggleAddModal() {
    setIsAddModalOpen((prevState) => !prevState);
  }
  if(!board.groups) return
  return (
    <div style={board?.style} className="board-details">
      <BoardHeader board={board} />

      <div className="board-content">
        {board && <GroupList setQuickEdit={setQuickEdit} quickEdit={quickEdit} board={board} groups={board.groups} />}

        <div className="group-add-container">
          {!isAddModalOpen && (
            <div
              className="btn-open-addGroup"
              onClick={(event) => onToggleAddModal(event)}
            >
              <FiPlus />
              Add another list
            </div>
          )}
          {isAddModalOpen && (
            <GroupAdd board={board} onToggleAddModal={onToggleAddModal} />
          )}
        </div>
      </div>

      {taskId && <TaskDetails setQuickEdit={setQuickEdit}/>}
      {quickEdit && <QuickEdit pos={quickEdit.pos} task={quickEdit.task} groupId={quickEdit.groupId} board={board} setQuickEdit={setQuickEdit}/>}
    </div>
  );
}
