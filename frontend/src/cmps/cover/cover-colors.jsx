import { boardService } from "../../services/board.service.local"
import { updateTask } from "../../store/actions/task.actions"


export function CoverColors({ board, task, groupId }) {


    function handleChange(style) {
        task.cover = style
        if(!task.coverSize) task.coverSize = 'half'
        updateTask(task, groupId, board)
    }


    return (
        <div className="cover-colors">
            <span className="title">Colors</span>
            <div className="colors-container">
                {boardService.boardStyles.map((style, idx) => {
                    return (
                        <div onClick={() => handleChange(style)}
                            key={style.backgroundColor}
                            className={`style-item ${((task?.cover?.backgroundColor) && (style.backgroundColor === task?.cover?.backgroundColor)) ? 'selected' : ''}`}
                            style={style}>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}