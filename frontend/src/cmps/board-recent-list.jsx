import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { setBoard } from "../store/board.actions"
import { useRef } from "react"
import { boardService } from "../services/board.service.local"

export function BoardRecentList({ modalLoc, toggleRecentList }) {

  const [boardsToDisplay, setBoardsToDisplay] = useState(null)
  const listRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    listRef.current.focus()
      ; (async () => {
        try {
          const recentBoardsToSet = await boardService.getLastviewedBoards(8)
          setBoardsToDisplay(recentBoardsToSet)
        } catch (error) {
          console.log('Cannot load boards')
        }
      })()
  }, [])

  function onBoardSelect(ev, boardId) {
    //ev.preventDefault()
    setBoard(boardId)
    navigate(`/board/${boardId}`)
    toggleRecentList()
  }

  function handleBlur({ relatedTarget }) {
    if (!relatedTarget) toggleRecentList()
  }

  return (
    <ul className="board-recent-list" style={modalLoc} onBlur={handleBlur} tabIndex="0" ref={listRef}>
      {!boardsToDisplay && <img width='100px' src={require(`../assets/img/recent-loader.webp`)} />}
      {boardsToDisplay && boardsToDisplay.map(board => {
        return (
          <li onClick={(event) => onBoardSelect(event, board._id)} key={board._id}>
            <div className="board-display" style={board.style}></div>
            <div className="board-title">{board.title}</div>
          </li>
        )
      })}
    </ul>
  )
}