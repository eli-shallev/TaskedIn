import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BiCheck } from "react-icons/bi";
import { updateTask } from "../../store/actions/task.actions";

export function TaskMembers({task, groupId, board, setQuickEdit, setQuickEditModal}) {
  const boardMembers = useSelector((state) => state.boardModule.currBoard.members);
  const [membersToShow, setMembersToShow] = useState(boardMembers || []);

  function handleChange({ target }) {
    if (target.type === "text") {
      const regex = new RegExp(target.value, "i");
      const filteredMembers = boardMembers.filter((member) =>
        regex.test(member.fullname)
      );
      setMembersToShow(filteredMembers);
    }
  }

  function onToggleMember(memberId) {
    const member = boardMembers.find((member) => member._id === memberId);
    if (task.memberIds?.includes(memberId)) {
      const index = task.memberIds.indexOf(memberId);
      task.memberIds.splice(index, 1);
    } else {
      if (task.memberIds) task.memberIds.push(memberId);
      else task.memberIds = [memberId];
    }
    if(setQuickEdit) setQuickEdit(prevState => ({ ...prevState, task }))
    updateTask(task, groupId, board)
  }

  return (
    <section className="members">
      <div className="">
        <input
          onChange={handleChange}
          id='members-input'
          className="search-member"
          type="text"
          placeholder="Search Members"
          autoFocus
        />
      </div>
      <p className="sub-header">Board members</p>
      <ul className="members-list">
        {membersToShow.map((member) => (
          <li key={member._id}>
            {member && (
              <div
                className="member-container"
                onClick={() => onToggleMember(member._id)}
              >
                <div className="member-img">
                  <img
                    src={member.imgUrl}
                    alt=""
                   
                  />
                </div>
                <span className="member-fullname">{member.fullname}</span>
                {task.memberIds?.includes(member._id) && (
                  <span className="checked-icon">
                    <BiCheck />
                  </span>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
