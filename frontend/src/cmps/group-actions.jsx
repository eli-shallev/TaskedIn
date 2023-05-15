import { useRef } from "react"
import { useEffect } from "react"
import { GrFormClose } from "react-icons/gr"

export function GroupActions({ onToggleModal,onRemoveGroup, group, onCopyGroup }) {
    const ElRef = useRef(null)

    // useEffect(() => {
    //     ElRef.current.focus()
    // }, [])


    return (
        <div className="group-actions" onBlur={onToggleModal} ref={ElRef} tabIndex="0">
            <button onClick={onToggleModal} className="btn-close-actions"><GrFormClose /></button>
            <div className="actions-title">List actions</div>
            <hr />
            <div onClick={() => onRemoveGroup(group._id)} className="btn-remove-group">Remove group</div>
            <div onClick={() => onCopyGroup(group)} className="btn-copy-group">Copy group</div>
        </div>
    )
}