import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { BiSearch } from "react-icons/bi"
import { setBoard, updateBoard } from "../store/board.actions"

export function BoardSearchList({ modalLoc, toggleSearchList }) {

    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const [boardsToDisplay, setBoardsToDisplay] = useState(null)
    const [filterbyStr, setFilterByStr] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const regex = new RegExp(filterbyStr, 'i')
        let BoardsToSet = boards.filter(board => regex.test(board.title))
        if (BoardsToSet.length > 8) {
            BoardsToSet = BoardsToSet.slice(0, 8)
        }
        setBoardsToDisplay(BoardsToSet)
    }, [filterbyStr])

    function onBoardSelect(ev, boardId) {
        //ev.preventDefault()
        setBoard(boardId)
        navigate(`/board/${boardId}`)
        toggleSearchList()
    }

    function handleChange({ target }) {
        setFilterByStr(target.value)
    }

    function handleBlur({ relatedTarget }){
      if(!relatedTarget) toggleSearchList()
    }

    return (
        <div style={modalLoc} className="board-search-list" onBlur={handleBlur}  >

            <div className="list-header">
                <BiSearch />
                <input type="text"
                    value={filterbyStr}
                    onChange={handleChange}
                    autoFocus
                />

            </div>

            <ul tabIndex="0" className="search-list">
                {boardsToDisplay && boardsToDisplay.map(board => {
                    return (
                        <li onClick={(event) => onBoardSelect(event, board._id)} key={board._id}>
                            <div className="board-display" style={board.style}></div>
                            <div className="board-title">{board.title}</div>
                        </li>
                    )
                })}
            </ul>

        </div>
    )

}