import React from "react";
import { updateTask } from "../../store/actions/task.actions";
import { BsSquareHalf } from "react-icons/bs";
import { utilService } from "../../services/util.service";
import { FastAverageColor } from 'fast-average-color'

export function DisplayAttachment({ task, attachment, groupId, board }) {
  const getAverageColor = new FastAverageColor()

  function onDeleteAttachment() {
    const { _id } = attachment;
    const taskToUpdate = {
      ...task,
      attachments: task.attachments.filter(
        (attachment) => attachment._id !== _id
      ),
    };
    updateTask(taskToUpdate, groupId, board);
  }

  async function onToggleCover() {
    if (task.cover?.backgroundImage && task.cover.backgroundImage.substring(5, task.cover.backgroundImage.length - 2) === attachment.url) {
      task.cover = null
      task.coverSize = null
    } else {
      const bgColor = await getAverageColor.getColorAsync(attachment.url)
      task.cover = {
        backgroundImage: `url('${attachment.url}')`,
        backgroundColor: bgColor.rgba
      }
      task.coverSize = 'half'
    }

    updateTask(task, groupId, board)
  }

  return (
    <section className="display-attachment">
      <a
        className="display-attachment-img"
        style={{ backgroundImage: `url(${attachment.url})` }}
        href={attachment.url}
        target={"_blank"}
        rel="noreferrer"
      >
        {" "}
      </a>
      <section className="attachment-details">
        <section className="attachment-name-and-options">
          <span className="attachment-name">{attachment.name}</span>
          <span>Added {utilService.timePassed(attachment.createdAt)}</span>
          <span> - </span>
          <span onClick={onDeleteAttachment} className="delete-attachment">
            Delete
          </span>
        </section>
        <span className="attachment-options">
          <span onClick={onToggleCover} className="make-attachment-cover">
            <section className="svg-holder">
              <BsSquareHalf
                className="icon"
                style={{
                  transform:
                    "rotate(0.75turn) translateY(-20%) translateX(22%)",
                }}
              />
            </section>
            {task.cover?.backgroundImage && task.cover.backgroundImage.substring(5, task.cover.backgroundImage.length - 2) === attachment.url ? 'Remove cover' : 'Make cover'}
          </span>
        </span>
      </section>
    </section>
  );
}
