import { boardService } from "../services/board.service.local.js";
import { groupService } from "../services/group.service.local.js"
import { store } from '../store/store.js'
import { SET_BOARDS, ADD_BOARD, REMOVE_BOARD, UPDATE_BOARD, SET_BOARD, UPDATE_BOARD_NO_SET } from "./board.reducer.js";

// Action Creators:
export function getActionRemoveBoard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}
export function getActionAddBoard(board) {
    return {
        type: ADD_BOARD,
        board
    }
}
export function getActionUpdateBoard(board) {
    console.log(board);
    return {
        type: UPDATE_BOARD,
        board
    }
}

export async function loadBoards(filterBy) {
    try {
        const boards = await boardService.query(filterBy)
        console.log('Boards from DB:', boards)
        store.dispatch({
            type: SET_BOARDS,
            boards
        })
    } catch (err) {
        console.log('Cannot load boards', err)
        throw err
    }
}

export async function setBoard(boardId) {
    try {
        let board = await boardService.getById(boardId)
        board.lastViewed = Date.now()
        board.headerStyle = board.headerStyle ? board.headerStyle : { backgroundColor: '#026aa7' }
        board = await boardService.save(board)
        console.log('from back board', board)
        console.log('Board from DB:', board)
        store.dispatch({
            type: SET_BOARD,
            board
        })
    } catch (err) {
        console.log('Cannot set board', err)
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch(getActionRemoveBoard(boardId))
    } catch (err) {
        console.log('Cannot remove board', err)
        throw err
    }
}

export async function addBoard(board) {
    try {
        console.log('IS here?', board)
        const savedBoard = await boardService.save(board)
        console.log('Added Board', savedBoard)
        store.dispatch(getActionAddBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export async function updateBoard(board) {
    try {
        const savedBoard = await boardService.save(board)
        console.log('Updated Board:', savedBoard)
        store.dispatch(getActionUpdateBoard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }
}

export async function updateBoardNoSet(board) {
    try {
        const savedBoard = await boardService.save(board)
        console.log('Updated Board:', savedBoard)
        store.dispatch({
            type: UPDATE_BOARD_NO_SET,
            board
        })
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }
}

export async function updateDrag({ source, destination, type, board }) {
    const boardToUpdate = board
    const update = type === 'TASK' ? groupService.relocateTasks : groupService.relocateGroups
    const groupsToSave = update(source, destination, boardToUpdate.groups)
    updateBoard({...boardToUpdate, groups: groupsToSave})
}