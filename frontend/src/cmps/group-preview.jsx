import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showErrorMsg } from "../services/event-bus.service.js";
import { taskService } from "../services/task.service.local.js";
import { AddTask } from "./add-task.jsx";
import { GroupTitle } from "./group-title.jsx";
import { TaskList } from "./task-list.jsx";
import { FiPlus } from "react-icons/fi";
import { updateBoard } from "../store/board.actions.js";

export function GroupPreview({ group, board, setQuickEdit, quickEdit }) {
  const filter = useSelector((storeState) => storeState.systemModule.filter)
  const [isFiltered, setIsFiltered] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  // const [tasks, setTasks] = useState([])


  // useEffect(() => {
    
  //   const regex = new RegExp(filter.keyword, 'i')
  //   const tasksToSet = group.tasks.filter(task => regex.test(task.title))
  //   setTasks(tasksToSet)
  //   console.log(tasksToSet)
  //   // setIsFiltered(true)
  // }, [filter])

  // useEffect(() => {
  //   if (tasks) {
  //     console.log('testttttttttttttttt')
  //     group.tasks = group.tasks.map(gTask => {
  //       let taskToSet = gTask
  //       tasks.forEach(task => {
  //         if (task._id === gTask._id) {
  //           taskToSet = task
  //         }
  //       })
  //       return taskToSet
  //     })
  //     updateBoard(board)
  //   }
  // }, [])

  function onToggleAddModal() {
    setIsAddModalOpen(prevState => !prevState)
  }

  return (
    <div className="group-preview">
      <GroupTitle group={group} board={board} />
      <TaskList groupTasks={group.tasks} board={board} groupId={group._id} setQuickEdit={setQuickEdit} quickEdit={quickEdit} />
      <div className="add-container">
        {!isAddModalOpen && <div onClick={onToggleAddModal} className="btn-open-add-task"><div className="plus"><FiPlus /></div>Add a card</div>}
        {isAddModalOpen && <AddTask onToggleAddModal={onToggleAddModal} tasks={group.tasks} board={board} groupId={group._id} />}
      </div>
    </div>
  )
}
