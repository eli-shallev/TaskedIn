import { CirclePicker } from 'react-color';
import { updateBoard } from "../store/board.actions.js";

export function MainHeaderColorPicker({ isHeaderColorPickerOpen, board }) {

    function handleChange(color) {
        let boardToSet = JSON.parse(JSON.stringify(board))
        boardToSet.headerStyle = { backgroundColor: color.hex }
        updateBoard(boardToSet)
    }

    return (
        <section className={`main-header-color-picker ${isHeaderColorPickerOpen ? 'open' : ''}`}>
            <span>Header color</span>
            <CirclePicker
                onChangeComplete={handleChange} />
        </section>
    )
}