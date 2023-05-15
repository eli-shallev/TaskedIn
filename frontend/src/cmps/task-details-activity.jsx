import React from "react";
import { GrSort } from 'react-icons/gr'

export function TaskDetailsActivities() {
  return (
    <section className="task-details-activity">
      <section className="header">
      <GrSort className="header-icon" />
        <p>Activity</p>
      </section>
      <section className="add-comment">
        <div className="member-img">
          <img src="#" alt="" />
        </div>
        <form>
          <input placeholder="Write a comment..." type="text" />
          <button>Save</button>
        </form>
      </section>
      <section className="activity-list"></section>
    </section>
  );
}
