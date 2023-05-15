import React, { useEffect, useRef, useState } from "react";
import { showErrorMsg } from "../services/event-bus.service";
import { groupService } from "../services/group.service.local";
import { updateBoard } from "../store/board.actions";
import { GroupActions } from "./group-actions";
import { HiDotsHorizontal } from "react-icons/hi";
import { utilService } from "../services/util.service";

export function GroupTitle({ group, board }) {
  const [groupToEdit, setGroupToEdit] = useState(group)
  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false)
  const saveGroupDebounce = useRef(utilService.debounce(groupService.save))

  useEffect(() => {
    saveGroupDebounce.current(board._id, groupToEdit)
  }, [groupToEdit])

  async function onHandleChange({ target }) {
    groupToEdit.title = target.value
    setGroupToEdit(prevGroup => ({ ...prevGroup }))
  }

  async function onRemoveGroup(groupId) {
    try {
      await groupService.remove(board._id, groupId)
      board.groups = board.groups.filter(group => group._id !== groupId)
      updateBoard(board)
    } catch (err) {
      showErrorMsg('Cannot remove group', err)
    }
  }

  async function onCopyGroup(group) {
    try {
      const groupToAdd = JSON.parse(JSON.stringify(group))
      delete groupToAdd._id
      const savedGroup = await groupService.save(board._id, groupToAdd)
      board.groups.push(savedGroup)
      await updateBoard(board)
      onToggleModal()
    } catch (err) {
      showErrorMsg('Cannot copy group', err)
    }
  }

  function onToggleModal() {
    setIsActionsModalOpen(prevState => !prevState)
  }

  return (
    <div className="group-title">
      <input type="text"
        name="title"
        value={groupToEdit?.title}
        onChange={onHandleChange} />
      <button onClick={onToggleModal} className="group-action-btn"><HiDotsHorizontal /></button>
      {isActionsModalOpen && <GroupActions onCopyGroup={onCopyGroup} onToggleModal={onToggleModal} onRemoveGroup={onRemoveGroup} group={group} />}
    </div>
  );
}
