export const SET_TASKS = 'SET_TASKS'
export const REMOVE_TASK = 'REMOVE_TASK'
export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'

const initialState = {
    tasks: []
}

export function taskReducer(state = initialState, action) {
    var tasks;
    switch (action.type) {
        case SET_TASKS:
            return { ...state, tasks: action.tasks }
        case REMOVE_TASK:
            tasks = state.tasks.filter(task => task._id !== action.taskId)
            return { ...state, tasks }
        case ADD_TASK:
            tasks = [action.task, ...state.tasks]
            return { ...state, tasks }
        case UPDATE_TASK:
            tasks = state.tasks.map(task => task._id === action.task._id ? action.task : task)
            return { ...state, tasks }
        default:
            return state;
    }
} 