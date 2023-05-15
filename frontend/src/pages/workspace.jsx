import React, { useEffect, useState } from "react";
import { BoardList } from "../cmps/board-list.jsx";
import { BoardFilter } from "../cmps/board-filter.jsx";
import { boardService } from "../services/board.service.local.js";
import { BoardAdd } from "../cmps/board-add.jsx";
import { loadBoards } from "../store/board.actions.js";
import { useSelector } from "react-redux";
import { AiOutlineStar } from "react-icons/ai";
import { FiClock } from "react-icons/fi";
import { utilService } from "../services/util.service.js";

export function Workspace() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false)
  const [addModalLoc, setAddModalLoc] = useState(null)
  const [filterBy, setFilterBy] = useState(boardService.getDefaultFilter())
  const [recentBoards, setRecentBoards] = useState(null)

  useEffect(() => {
    ; (async () => {
      try {
        await loadBoards(filterBy)
        const recentBoardsToSet = await boardService.getLastviewedBoards(4)
        setRecentBoards(recentBoardsToSet)
      } catch (error) {
        console.log('Cannot load boards')
      }
    })()
  }, [filterBy])

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function onToggleAddBoardModal(ev, ref) {
    if (ref) {
      let pos = utilService.getModalPosition('', ref);
      pos.left += 200
      if (pos.left + 350 > window.innerWidth) pos.left = window.innerWidth-300
      let modalStyle = { left: pos.left + "px", top: pos.bottom + "px" };
      if (pos.right) {
        delete modalStyle.left;
        modalStyle.right = pos.right;
      }
      setAddModalLoc(modalStyle)
    }

    setIsBoardModalOpen(prevState => !prevState)

  }

  return (
    <div className="workspace">

      {boards.filter(board => board.isStarred).length !== 0 && <div className="starred-boards">

        <div className="starred-boards-title">
          <span className="star-icon"><AiOutlineStar /></span>
          <span className="title">Starred boards</span>
        </div>

        <BoardList isAddable={false} boards={boards.filter(board => board.isStarred)} onToggleAddBoardModal={onToggleAddBoardModal} />

      </div>}

      <div className="recent-boards">
        <div className="recent-boards-title">
          <span className="recent-icon"><FiClock /></span>
          <span className="title">Recently viewed</span>
        </div>

        {recentBoards && <BoardList isAddable={false} boards={recentBoards} onToggleAddBoardModal={onToggleAddBoardModal} />}

      </div>
      <div className="all-boards">
        <span className="your-boards-title">YOUR BOARDS</span>
        {boards && <BoardList isAddable={true} boards={boards} onToggleAddBoardModal={onToggleAddBoardModal} />}
      </div>
      {isBoardModalOpen && <BoardAdd addModalLoc={addModalLoc} onToggleAddBoardModal={onToggleAddBoardModal} />}
    </div>
  );
}
