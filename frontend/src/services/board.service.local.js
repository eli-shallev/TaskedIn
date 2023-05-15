
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { getActionAddBoard, getActionRemoveBoard, getActionUpdateBoard, updateBoard, updateBoardNoSet } from '../store/board.actions.js'
import { FaUserCircle } from "react-icons/fa";
import { createApi } from "unsplash-js";
import { httpService } from './http.service.js'
import { socketService, SOCKET_EVENT_BOARD_ADDED, SOCKET_EVENT_BOARD_UPDATED, SOCKET_EVENT_BOARD_REMOVED } from './socket.service.js';
import { store } from '../store/store.js';

const STORAGE_KEY = 'board'
const boardStyles = [
    { backgroundColor: '#0079bf' },
    { backgroundColor: '#d29034' },
    { backgroundColor: '#519839' },
    { backgroundColor: '#b04632' },
    { backgroundColor: '#89609e' },
    { backgroundColor: '#cd5a91' },
    { backgroundColor: '#4bbf6b' },
    { backgroundColor: '#00aecc' },
    { backgroundColor: '#838c91' },
    { backgroundColor: '#f5dd29' }
]
const boardStylesImg = [
    {
        backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')`,
        backgroundSize: 'cover',
        // backgroundRepeat: 'no - repeat'
    },
    {
        backgroundImage: `url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')`,
        backgroundSize: 'cover',
        // backgroundRepeat: 'no - repeat'
    },
    {
        backgroundImage: `url('https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')`,
        backgroundSize: 'cover',
        // backgroundRepeat: 'no - repeat'
    },
    {
        backgroundImage: `url('https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80                                                                           ')`,
        backgroundSize: 'cover',
        // backgroundRepeat: 'no - repeat'
    }
]

    ; (() => {
        socketService.on(SOCKET_EVENT_BOARD_ADDED, (board) => {
            console.log('GOT from socket', board)
            store.dispatch(getActionAddBoard(board))
        })
        socketService.on(SOCKET_EVENT_BOARD_UPDATED, (board) => {
            if (store.getState().boardModule.currBoard._id === board._id) {
                console.log('GOT from socket', board)
                store.dispatch(getActionUpdateBoard(board))
            }

        })
        socketService.on(SOCKET_EVENT_BOARD_REMOVED, (boardId) => {
            console.log('GOT from socket', boardId)
            store.dispatch(getActionRemoveBoard(boardId))
        })
    })()

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    getDefaultFilter,
    toggleStar,
    getLastviewedBoards,
    getUnsplashApi,
    boardStyles,
    boardStylesImg
}

window.cs = boardService

// async function query(filterBy = getDefaultFilter()) {
//     var boards = await storageService.query(STORAGE_KEY)
//     if (filterBy.title) {
//         const regex = new RegExp(filterBy.title, 'i')
//         boards = boards.filter(board => regex.test(board.title))
//     }
//     boards.sort((board1, board2) => board1[filterBy.sortBy].localeCompare(board2[filterBy.sortBy]) * filterBy.sortDesc)
//     return boards
// }

async function query(filterBy = { txt: '' }) {
    // return storageService.get(STORAGE_KEY)
    return await httpService.get(STORAGE_KEY, filterBy)
}

async function getById(boardId) {
    // return storageService.get(STORAGE_KEY, boardId)
    return await httpService.get(`board/${boardId}`)
}

async function remove(boardId) {
    // throw new Error('Nope')
    // await storageService.remove(STORAGE_KEY, boardId)
    return await httpService.delete(`board/${boardId}`)
}

// async function save(board) {
//     var savedBoard
//     if (board._id) {
//         savedBoard = await storageService.put(STORAGE_KEY, board)
//     } else {
//         // Later, owner is set by the backend
//         //board.createdBy = userService.getLoggedinUser()
//         board.members = [
//             {
//                 _id: "u101",
//                 fullname: "Eli Shallev",
//                 imgUrl: 'https://res.cloudinary.com/dlhh3aon3/image/upload/v1674333645/trello-profile-pics/T043N4KE97B-U049AMXDTPY-9ec00af7e7df-512_kaegik.jpg'
//             },
//             {
//                 _id: "u102",
//                 fullname: "Alex Okin",
//                 imgUrl: 'https://res.cloudinary.com/dlhh3aon3/image/upload/v1674333627/trello-profile-pics/T043N4KE97B-U0436HRD15K-ed7a82d2139d-512_xrimhd.jpg'
//             },
//             {
//                 _id: "u103",
//                 fullname: "Yossef Nahari",
//                 imgUrl: 'https://res.cloudinary.com/dlhh3aon3/image/upload/v1674333641/trello-profile-pics/T043N4KE97B-U04310KBZ6K-8b9f2fcd3a1e-512_ejqkve.jpg'
//             },
//         ]
//         savedBoard = await storageService.post(STORAGE_KEY, board)
//     }
//     return savedBoard
// }

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await httpService.put(`board/${board._id}`, board)

    } else {
        board.members =
            [
                {
                    _id: "u101",
                    fullname: "Eli Shallev",
                    imgUrl: 'https://res.cloudinary.com/dlhh3aon3/image/upload/v1674333645/trello-profile-pics/T043N4KE97B-U049AMXDTPY-9ec00af7e7df-512_kaegik.jpg'
                },
                {
                    _id: "u102",
                    fullname: "Alex Okin",
                    imgUrl: 'https://res.cloudinary.com/dlhh3aon3/image/upload/v1674333627/trello-profile-pics/T043N4KE97B-U0436HRD15K-ed7a82d2139d-512_xrimhd.jpg'
                },
                {
                    _id: "u103",
                    fullname: "Yossef Nahari",
                    imgUrl: 'https://res.cloudinary.com/dlhh3aon3/image/upload/v1674333641/trello-profile-pics/T043N4KE97B-U04310KBZ6K-8b9f2fcd3a1e-512_ejqkve.jpg'
                }
            ]
        savedBoard = await httpService.post('board', board)
    }
    return savedBoard
}

async function toggleStar(boardId, isSet = true) {
    try {
        const board = await boardService.getById(boardId)
        board.isStarred = !board.isStarred
        if (isSet) {
            await updateBoard(board)
        } else {
            await updateBoardNoSet(board)
        }

    } catch (error) {
        console.log('Cannot change board starred status')
    }
}

async function getLastviewedBoards(numOfBaords) {
    let sortedBoards = JSON.parse(JSON.stringify(await query()))
    sortedBoards = sortedBoards.filter(board => board.lastViewed)
    sortedBoards.sort((board1, board2) => board2.lastViewed - board1.lastViewed)
    return sortedBoards.slice(0, numOfBaords)
}

function getUnsplashApi() {
    return createApi({
        accessKey: "FZWFlSNRE6IRuFz6Pm9cPqQjUoa5egxHDuU_fyh5UYQ"
    })
}

function getEmptyBoard() {
    return {
        title: '',
        isStarred: false,
        archivedAt: '',
        style: { backgroundColor: 'lightgray', largeLabels: false },
        headerStyle: { backgroundColor: 'lightgray' },
        labels: [],
        members: [],
        groups: []
    }
}

function getDefaultFilter() {
    return {
        title: '',
        sortBy: 'title',
        sortDesc: 1
    }
}


// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




