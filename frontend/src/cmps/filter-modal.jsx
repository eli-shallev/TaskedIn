import { useEffect, useState } from "react"
import { boardService } from "../services/board.service.local"
import { GrFormClose } from "react-icons/gr"
import { groupService } from "../services/group.service.local"
import { useSelector } from "react-redux"
import { setFilter } from "../store/system.actions"
import { setBoard, updateBoard } from "../store/board.actions"

export function FilterModal({ onToggleFilterModal, board }) {

    const filter = useSelector((storeState) => storeState.systemModule.filter)
    const [taskFilter, setTaskFilter] = useState(filter)


    useEffect(() => {
        setFilter(taskFilter)
    }, [taskFilter])

    function hanleChange({ target }) {
        const { value, name: field } = target
        setTaskFilter(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    return (
        <div className="filter-modal" onBlur={onToggleFilterModal}>
            <div className="modal-header">
                <span>Filter</span>
                <button className="btn-close-modal" onClick={onToggleFilterModal}><GrFormClose /></button>
            </div>
            <hr />
            <form action="">
                <label htmlFor="keyword">Keyword</label>
                <input type="text"
                    id="keyword"
                    name="keyword"
                    placeholder="Enter a keyword..."
                    value={taskFilter?.keyword}
                    onChange={hanleChange}
                    autoFocus />
            </form>
        </div>
    )
}