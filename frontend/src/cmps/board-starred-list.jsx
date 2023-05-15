import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AiOutlineStar, AiFillStar } from "react-icons/ai"
import { boardService } from "../services/board.service.local"
import { useNavigate } from "react-router"
import { useRef } from "react"
import { setBoard } from "../store/board.actions"


export function BoardStarredList({ modalLoc, toggleStarredList }) {

    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const [starredBoards, setStarredBoards] = useState(null)
    const listRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        listRef.current.focus()
    }, [])

    useEffect(() => {
        listRef.current.focus()
        const starredBoardsToSet = boards.filter(board => board.isStarred)
        setStarredBoards(starredBoardsToSet)
    }, [boards])

    function onToggleStar(ev, boardId) {
        ev.stopPropagation()
        boardService.toggleStar(boardId,false)
    }

    function onBoardSelect(boardId) {
        setBoard(boardId)
        navigate(`/board/${boardId}`)
    }

    return (
        <ul tabIndex="0" style={modalLoc} className={`board-starred-list ${starredBoards?.length === 0 ? 'empty-list' : ''}`} onBlur={toggleStarredList} ref={listRef}>
            {starredBoards?.length === 0 && <img src={require(`../assets/img/no-starred-boards.png`)} />}
            {starredBoards && starredBoards.map(board => {
                return (
                    <li onClick={() => onBoardSelect(board._id)} key={board._id}>
                        <div className="board-display" style={board.style}></div>
                        <div className="board-title">{board.title}</div>
                        <div onClick={(event) => onToggleStar(event, board._id)} id='btn-star' className='btn-star'>
                            <div className="filled-star"><AiFillStar /></div>
                            <div className="outline-star"><AiOutlineStar /></div>
                        </div>
                    </li>
                )
            })}
        </ul>
    )

}