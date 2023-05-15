const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getBoards, getBoardById, addBoard, updateBoard, removeBoard, addBoardMsg, removeBoardMsg } = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getBoards)
router.get('/:boardId', getBoardById)
router.post('/', requireAuth, addBoard) // Need to add later a middleware requireAuth
router.put('/:boardId', requireAuth, updateBoard) // Need to add later a middleware requireAuth
router.delete('/:boardId', requireAuth, removeBoard) // Need to add later a middleware requireAuth, requireAdmin

router.post('/:id/msg', requireAuth, addBoardMsg)
router.delete('/:id/msg/:msgId', requireAuth, removeBoardMsg)

module.exports = router