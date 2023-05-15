import { boardService } from '../services/board.service.local.js';
import { updateBoard } from "../store/board.actions.js";

export function BoardColorPicker({ isBgColorPickerMenuOpen, board }) {

    function handleChange(style) {
        let boardToSet = JSON.parse(JSON.stringify(board))
        boardToSet.style = style
        boardToSet.headerStyle = style
        updateBoard(boardToSet)
    }

    return (
        <section className={`board-color-picker ${isBgColorPickerMenuOpen ? 'open' : ''}`}>
            {boardService.boardStyles.map((style, idx) => {
                return (
                    <div onClick={() => handleChange(style)}
                        key={style.backgroundColor}
                        className={`style-item item${idx + 1}`}
                        style={style}>
                    </div>
                )
            })}
        </section>
    )
}