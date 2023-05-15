import { useState } from "react"
import { boardService } from "../services/board.service.local"
import { addBoard, setBoard } from "../store/board.actions"
import { GrFormClose } from "react-icons/gr"
import { useNavigate } from "react-router"
import { FastAverageColor } from 'fast-average-color'


export function BoardAdd({ onToggleAddBoardModal, addModalLoc, fromHeader }) {
    const [boardToAdd, setBoardToAdd] = useState(boardService.getEmptyBoard())
    const navigate = useNavigate()
    const getAverageColor = new FastAverageColor()

    function handleChange({ target }) {
        const { value, name: field } = target
        setBoardToAdd(prevBoard => ({ ...prevBoard, [field]: value }))
    }

    async function onStyleChange(style) {
        let headerStyle
        if (style.backgroundColor) {
            headerStyle = style
        } else {
            const headerColor = await getAverageColor.getColorAsync(style.backgroundImage.substring(5, style.backgroundImage.length - 3))
            headerStyle = {
                backgroundColor: headerColor.rgba
            }
        }
        setBoardToAdd(prevBoard => ({ ...prevBoard, style, headerStyle }))
    }

    async function onAddBoard(ev) {
        ev.preventDefault()
        try {
            onToggleAddBoardModal()
            const savedBoard = await addBoard(boardToAdd)
            if (fromHeader) {
                setBoard(savedBoard._id)
                navigate(`/board/${savedBoard._id}`)
            }
        } catch (err) {
            console.log(err)
        }
    }

    function handleBlur({ relatedTarget }) {
        if (!relatedTarget) onToggleAddBoardModal()
    }

    return (
        <div tabIndex="0" style={addModalLoc} className="board-add" onBlur={handleBlur} >
            <div className="borad-add-header">
                <span className="title">Create board</span>
                <button className="btn-close" onClick={onToggleAddBoardModal}><GrFormClose /></button>
            </div>

            <hr />
            <div className="board-preview-img" style={boardToAdd?.style}>
                <div className="board-preview-img"></div>
            </div>
            <span>Background</span>
            <div className="styles-img">
                {boardService.boardStylesImg.map((style, idx) => {
                    return (
                        <div onClick={() => onStyleChange(style)}
                            key={style.backgroundColor}
                            className={`style-img img${idx + 1}`}
                        >
                        </div>
                    )
                })}
            </div>
            <div className="styles">
                {boardService.boardStyles.slice(0, 6).map((style, idx) => {
                    return (
                        <div onClick={() => onStyleChange(style)}
                            key={style.backgroundColor}
                            className={`style-item item${idx + 1}`}
                            style={style}>
                        </div>
                    )
                })}
            </div>

            <form onSubmit={onAddBoard}>
                <label htmlFor="title">Board title<span style={{ color: ' red' }}>*</span></label>
                <input className={`input-title ${!boardToAdd.title ? 'empty' : ''}`} type="text"
                    id="title"
                    name="title"
                    value={boardToAdd.title}
                    onChange={handleChange}
                    required
                    autoFocus />
                {!boardToAdd.title && <div>👋 Board title is required</div>}
                <button className="btn-create" disabled={boardToAdd.title === ''} >Create</button>
            </form>
        </div>
    )
}