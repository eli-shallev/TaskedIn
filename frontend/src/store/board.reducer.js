export const SET_BOARDS = 'SET_BOARDS '
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const SET_BOARD = 'SET_BOARD'
export const UPDATE_BOARD_NO_SET = 'UPDATE_BOARD_NO_SET'

const initialState = {
    boards: [],
    currBoard: {}
}

export function boardReducer(state = initialState, action) {
    var newState = state
    var boards
    var currBoard
    switch (action.type) {
        case SET_BOARDS:
            newState = { ...state, boards: action.boards }
            break
        case REMOVE_BOARD:
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards }
            break
        case ADD_BOARD:
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case UPDATE_BOARD:
            boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            currBoard = action.board
            newState = { ...state, boards, currBoard }
            break
        case UPDATE_BOARD_NO_SET:
            boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            newState = { ...state, boards }
            break
        case SET_BOARD:
            newState = { ...state, currBoard: action.board }
            break
        default:
    }
    return newState
}
