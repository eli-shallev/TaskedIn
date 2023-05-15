import React, { useEffect, useState } from "react";
import { GrFormEdit } from "react-icons/gr";
import { useSelector } from "react-redux";
import { taskService } from "../../services/task.service.local";
import { utilService } from "../../services/util.service";
import { updateTask } from "../../store/actions/task.actions";
import { updateBoard } from "../../store/board.actions";
import { CreateLabel } from "./create-label";
import { BsCheck } from "react-icons/bs";



export function Labels({
  task,
  groupId,
  board,
  onToggleLabelEdit,
  isEditLabels,
  setQuickEdit
}) {
  let boardLabelsState = useSelector(
    (state) => state.boardModule.currBoard.labels || []
  );
  const [selectedLabel, setSelectedLabel] = useState();
  const [boardLabels, setBoardLabels] = useState(boardLabelsState);

  useEffect(() => {
    setBoardLabels(boardLabelsState);
    return () => {
      setSelectedLabel(null);
    };
  }, [boardLabelsState]);


  function handleChange(ev, labelId) {
    const { target } = ev;
    if (target.type === "checkbox") {
      if (!task.labelIds) task.labelIds = [];
      if (target.checked) task.labelIds.push(labelId);
      else if (!target.checked) {
        const labelIdx = task.labelIds.findIndex(
          (currLabelId) => currLabelId === labelId
        );
        task.labelIds.splice(labelIdx, 1);
      }
      if (setQuickEdit) setQuickEdit(prevState => ({ ...prevState, task }))
      updateTask(task, groupId, board);
    } else if (target.type === "text") {
      const regex = new RegExp(target.value, "i");
      const filteredLabels = board.labels.filter((label) =>
        regex.test(label.title)
      );
      setBoardLabels(filteredLabels);
    }
  }

  function onOpenSaveLabel(ev, label) {
    ev.preventDefault();
    if (label) setSelectedLabel(label);
    onToggleLabelEdit();
  }

  function onSaveLabel(label) {
    if (!board.labels.length) board.labels = [];
    if (!task.labelIds) task.labelIds = [];

    if (label._id) {
      const labelIdx = board.labels.findIndex(
        (label) => label._id === selectedLabel._id
      );
      board.labels.splice(labelIdx, 1, label);
    } else {
      label._id = utilService.makeId();
      task.labelIds.push(label._id);
      board.labels.push(label);
      taskService.update(board, groupId, task);
      setSelectedLabel(null);
      if (setQuickEdit) setQuickEdit(prevState => ({ ...prevState, task }))
      updateBoard(board);
      return;
    }
    setSelectedLabel(null);
    updateBoard(board);
  }

  function onRemoveLabel(labelId) {
    const labelsToSave = boardLabels.filter(
      (currLabel) => currLabel._id !== labelId
    );
    board.labels = labelsToSave;
    const cleanBoard = taskService.cleanTasksLabelIds(board, labelId);
    updateBoard(cleanBoard);
  }

  return (
    <section className="labels">
      {isEditLabels ? (
        <CreateLabel

          label={selectedLabel}
          onToggleLabelEdit={onToggleLabelEdit}
          onRemoveLabel={onRemoveLabel}
          onSaveLabel={onSaveLabel}
        />
      ) : (
        <section className="label-select">
          <div className="search-label-div">
            <input
              onClick={(ev) => {
                ev.preventDefault();
              }}
              onChange={handleChange}
              className="search-label"
              type="text"
              placeholder="Search labels…"
              autoFocus
            />
          </div>
          <p className="sub-header">Labels</p>
          <ul>
            {boardLabels.map((label) => (
              <li key={label._id}>
                <label htmlFor={label._id} className="checkbox-container" >
                  <input
                    onChange={(ev) => {
                      handleChange(ev, label._id);
                    }}
                    checked={task.labelIds?.includes(label._id)}
                    className="checkbox"
                    type="checkbox"
                    id={label._id}
                  />
                  <span className={`checkmark ${task.labelIds?.includes(label._id) ? 'checked' : ''}`}> {task.labelIds?.includes(label._id) && <BsCheck />}</span>
                  <div className="label-container">
                    <div className={`label-color ${label.class}`}>
                      <div
                        className={`label-color-circle ${label.color}`}
                      ></div>
                      {label.title && (
                        <span className="label-title">{label.title}</span>
                      )}
                    </div>
                  </div>
                </label>
                <button
                  onClick={(ev) => {
                    onOpenSaveLabel(ev, label);
                  }}
                  className="edit"
                >
                  <GrFormEdit/>
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={(ev) => {
              onOpenSaveLabel(ev);
            }}
            className="create"
          >
            Create new label
          </button>
        </section>
      )}
    </section>
  );
}
