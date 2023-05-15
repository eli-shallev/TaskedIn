import React, { useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";

export function TaskMembersSubheader({ memberIds, onOpenModal }) {
  const btnAddMemberRef = useRef();
  const boardMembers = useSelector((state) => state.boardModule.currBoard.members);
  
  const membersToShow = boardMembers.filter((member) =>
    memberIds.includes(member._id)
  );

  return (
    <section className="task-members-subheader">
      <h4 className="title">Members</h4>
      <div className="members-container">
        {membersToShow.map((member) => (
          <div className="member-img" key={member._id}>
            <img src={member.imgUrl} alt="member-img" />
          </div>
        ))}
        <button
          onClick={() => {
            onOpenModal("Members", btnAddMemberRef);
          }}
          ref={btnAddMemberRef}
          className="btn-add-member"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </section>
  );
}
