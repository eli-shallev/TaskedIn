import React from "react";
import { updateBoard } from "../../store/board.actions";

export function TaskLabelsList({ labelIds, board }) {
  const boardLabels = board.labels;
  const labelsToShow = boardLabels.filter((label) =>
    labelIds.includes(label._id)
  );
  let largeLabels = board.style.largeLabels;

  function toggleLabelSize(ev) {
    ev.preventDefault();
    const boardToSet = JSON.parse(JSON.stringify(board))
    boardToSet.style.largeLabels = board.style.largeLabels ? false : true;
    updateBoard(boardToSet);
  }

  const labelsSize = largeLabels ? "large" : "";

  return (
    <section className="task-labels-list">
      {labelsToShow.map((label) => (
        <div className="label-container" key={label._id}>
          <div
            key={label.id}
            onClick={toggleLabelSize}
            className={`task-labels-preview ${
              largeLabels ? label.class : label.color + "-hoverable"
            } ${labelsSize}`}
          >
            {largeLabels && (
              <>
                <div className={`color-circle ${label.color}`}></div>
                <span className="label-title">{label.title}</span>
              </>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
