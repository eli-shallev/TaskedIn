const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getBackgrounds, addBackground, removeBackground } = require('./background.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getBackgrounds)
router.post('/', addBackground) // Need to add later a middleware requireAuth
router.delete('/:backgroundId', removeBackground) // Need to add later a middleware requireAuth, requireAdmin

module.exports = router