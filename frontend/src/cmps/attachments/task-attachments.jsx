import React from "react";
import { GrAttachment } from "react-icons/gr";
import { DisplayAttachment } from "./display-attachment";

export function TaskAttachments({ task, groupId, board }) {
  const { attachments } = task;
  return (
    <section className="task-attachments">
      <div className="attachments-header">
        <h3>Attachments</h3>
        <GrAttachment />
      </div>

      <div className="attachments-body">
        {attachments &&
          attachments.map((attachment) => (
            <DisplayAttachment
              key={attachment.id}
              task={task}
              attachment={attachment}
              groupId={groupId}
              board={board}
            />
          ))}
      </div>
    </section>
  );
}
