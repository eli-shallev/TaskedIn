
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { boardService } from './board.service.local.js'
import { updateBoard } from '../store/board.actions.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'board'

export const groupService = {
    query,
    getById,
    save,
    remove,
    getEmptyGroup,
    getGroupTitle,
    relocateGroups,
    relocateTasks
}

window.cs = groupService

async function query(boardId) {
    try {
        // const board = await storageService.get(STORAGE_KEY, boardId)
        const board = await httpService.get(STORAGE_KEY)
        return board.groups
    } catch (err) {
        throw err
    }
}

async function getById(boardId, groupId) {
    try {
        // const board = await storageService.get(STORAGE_KEY, boardId)
        const board = await httpService.get(`board/${boardId}`)
        const group = board.groups.find(group => group._id === groupId)
        return group
    } catch (err) {
        throw err
    }
}

async function remove(boardId, groupId) {
    // throw new Error('Nope')
    try {
        // const board = await storageService.get(STORAGE_KEY, boardId)
        const board = await httpService.get(`board/${boardId}`)
        board.groups = board.groups.filter(group => group._id !== groupId)
        // await storageService.put(STORAGE_KEY, board)
        updateBoard(board)
    } catch (err) {
        throw err
    }
}

async function save(boardId, group) {
    try {
        // const board = await boardService.getById(boardId)
        const board = await httpService.get(`board/${boardId}`)
        if (group._id) {
            board.groups = board.groups.map(currGroup => {
                if (currGroup._id !== group._id){
                   return currGroup
                }
                else{
                    group.tasks = currGroup.tasks
                    return group
                }
            })
        } else {
            // Later, owner is set by the backend
            //group.createdBy = userService.getLoggedinUser()
            group._id = utilService.makeId()
            board.groups.push(group)
        }
        // await storageService.put(STORAGE_KEY, board)
        updateBoard(board)
        return group
    } catch (err) {
        throw err
    }

}

async function getGroupTitle(boardId, groupId) {
    const group = await groupService.getById(boardId, groupId)
    const groupTitle = group.title
    return groupTitle
}

function getEmptyGroup() {
    return {
        title: '',
        archivedAt: '',
        style: {},
        tasks: []
    }
}

function relocateTasks(source, destination, groups) {
    const sourceGroup = groups.find(group => group._id === source.droppableId)
    const [task] = sourceGroup.tasks.splice(source.index, 1)
    const destinationGroup = groups.find(group => group._id === destination.droppableId)
    destinationGroup.tasks.splice(destination.index, 0, task)
    return groups
}
function relocateGroups(source, destination, groups) {
    const [group] = groups.splice(source.index, 1)
    groups.splice(destination.index, 0, group)
    return groups
}

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




