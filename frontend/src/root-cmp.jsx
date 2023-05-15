import React from "react";
import { Routes, Route } from "react-router";
import { BoardDetails } from "./cmps/board-details";
import { LoginSignup } from "./cmps/login-signup";
import { MainHeader } from "./cmps/main-header";
import { TaskDetails } from "./cmps/task-details";
import { HomePage } from "./pages/home-page";
import { Workspace } from "./pages/workspace";


export function RootCmp() {
  return (
    <div>
      <main>
        <MainHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login-signup" element={<LoginSignup />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/board/:boardId" element={<BoardDetails />} >
            <Route path='/board/:boardId/:groupId/:taskId' element={<TaskDetails />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}
