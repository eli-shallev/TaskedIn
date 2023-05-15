import React, { useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { boardService } from "../services/board.service.local";
import { IoFilterSharp } from "react-icons/io5";
import { HiDotsHorizontal } from "react-icons/hi";
import { FilterModal } from "./filter-modal";
import { useSelector } from "react-redux";
import { setFilter } from "../store/system.actions";
import { SideMenu } from "./side-menu";
import { updateBoard } from "../store/board.actions";

export function BoardHeader({ board }) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const filter = useSelector((storeState) => storeState.systemModule.filter)
  const [tilteToEdit, setTitleToEdit] = useState(board.title)

  useEffect(()=>{
    setTitleToEdit(board.title)
  },[board])

  function onToggleStar() {
    boardService.toggleStar(board._id)
  }

  function onToggleFilterModal() {
    setIsFilterModalOpen(prevState => !prevState)
  }

  function onTitleChange({ target }) {
    if (target.value) setTitleToEdit(target.value)
  }

  function onSubmit(ev) {
    ev.preventDefault()
    board.title = tilteToEdit
    updateBoard(board)
  }

  return (
    <div className="board-header">
      <div className="board-status">
        <form onSubmit={onSubmit}>
          <input className="board-title" type="text"
            value={tilteToEdit}
            onChange={onTitleChange}
            onBlur={onSubmit}
            required />
        </form>
        <span onClick={onToggleStar} className={`btn-star ${board.isStarred ? 'starred' : ''}`}>{board.isStarred ? <AiFillStar /> : <AiOutlineStar />}</span>
      </div>
      <div className={`board-action ${isSideMenuOpen ? 'menu-open' : ''}`}>
        <button onClick={onToggleFilterModal} className={`btn-filter ${filter.keyword ? 'active' : ''}`} ><IoFilterSharp /> Filter</button>
        {filter.keyword && <button className="btn-clear-filter" onClick={() => setFilter({ keyword: '' })} title="Clear filter">X</button>}
        <span className="divider"></span>
        <div className="members-container">
          {board.members?.map((member, idx) => {
            return (
              <img style={{ left: `${idx * 25}px` }} key={member._id} src={member.imgUrl} alt="" />
            )
          })}

        </div>
        <span className="divider"></span>
        {!isSideMenuOpen && <button className="btn-menu" onClick={() => setIsSideMenuOpen(true)}><HiDotsHorizontal /></button>}

        <SideMenu board={board} isSideMenuOpen={isSideMenuOpen} setIsSideMenuOpen={setIsSideMenuOpen} />
        {isFilterModalOpen && <FilterModal board={board} onToggleFilterModal={onToggleFilterModal} />}
      </div>
    </div>
  )
}
