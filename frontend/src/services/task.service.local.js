import { utilService } from "./util.service";
import { storageService } from "./async-storage.service";
import { boardService } from "./board.service.local";
import { groupService } from "./group.service.local";
import { httpService } from './http.service.js'

const STORAGE_KEY = "board";

export const taskService = {
  query,
  add,
  remove,
  update,
  save,
  addChecklist,
  addTodo,
  cleanTasksLabelIds,
  getById,
  addImg
}

async function query(boardId, groupId, filter) {
  try {
    const group = await groupService.getById(boardId, groupId)
    const regex = new RegExp(filter.keyword, 'i')
    return group.tasks.filter(task => regex.test(task.title))
  } catch (err) {
    throw err
  }
}

async function getById(boardId, groupId, taskId) {
  try {
    const group = await groupService.getById(boardId, groupId)
    return group.tasks.filter(task => task._Id === taskId)
  } catch (err) {
    throw err
  }
}

function add(title, groupId, board) {
  const group = board.groups.find((group) => group._id === groupId);
  const savedTask = { title, _id: utilService.makeId(), description: "" };
  group.tasks.push(savedTask);
  return Promise.resolve(savedTask);
}

async function remove(board, groupId, taskId) {
  try {
    const group = board.groups.find((group) => group._id === groupId);
    group.tasks = group.tasks.filter((task) => task._id !== taskId);
    // await storageService.put(STORAGE_KEY, board);
    await await boardService.save(board)
  } catch (err) {
    throw err;
  }
}

async function update(board, groupId, task) {
  try {
    console.log('board', board)
    console.log('groupId', groupId)
    console.log('task', task)
    const group = board.groups.find((group) => group._id === groupId);
    group.tasks = group.tasks.map((currTask) =>
      currTask._id === task._id ? task : currTask
    );
    // await storageService.put(STORAGE_KEY, board);
    await httpService.put(`board/${board._id}`, board)
  } catch (err) {
    throw err;
  }
}

async function save(boardId, groupId, title) {
  try {
    const board = await boardService.getById(boardId);
    const group = board.groups.find((group) => group._id === groupId);
    group.tasks.push({ title, id: utilService.makeId() });
    // await storageService.put(STORAGE_KEY, board);
    await httpService.put(`board/${board._id}`, board)
    return group;
  } catch (err) {
    throw err;
  }
}

function addChecklist(title, taskId, groupId, board) {
  const checklist = {
    _id: utilService.makeId(),
    todos: [],
    title,
  };
  const group = board.groups.find((group) => group._id === groupId);
  const task = group.tasks.find((task) => task._id === taskId);
  if (task.checklists) task.checklists.push(checklist);
  else task.checklists = [checklist];
}

function addTodo(title, checkListId, groupId, taskId, board) {
  const todo = {
    _id: utilService.makeId(),
    isDone: false,
    title,
  };

  const group = board.groups.find((group) => group._id === groupId);
  const task = group.tasks.find((task) => task._id === taskId);
  const checklist = task.checklists.find(
    (checklist) => checklist._id === checkListId
  );
  checklist.todos.push(todo);

  return board;
}

function addImg(imgUrl, task, groupId, board) {
  const attachmentImage = {
    _id: utilService.makeId(),
    createdAt: Date.now(),
    url: imgUrl,
    name: "Attachment Image",
  };

  const groupIdx = board.groups.findIndex((group) => group._id === groupId);
  const taskIdx = board.groups[groupIdx].tasks.findIndex(
    (currTask) => currTask._id === task._id
  );
  if (!board.groups[groupIdx].tasks[taskIdx].attachments)
    board.groups[groupIdx].tasks[taskIdx].attachments = [];
  board.groups[groupIdx].tasks[taskIdx].attachments.push(attachmentImage);
}

function cleanTasksLabelIds(board, labelId) {
  board.groups.forEach((group) => {
    group.tasks.forEach((task) => {
      if (!task.labelIds || !task.labelIds.length) return;
      const labelIdIdx = task.labelIds?.findIndex(
        (currLabelId) => currLabelId === labelId
      );
      if (labelIdIdx === 0 || labelIdIdx) task.labelIds.splice(labelIdIdx, 1);
    });
  });
  return board;
}
