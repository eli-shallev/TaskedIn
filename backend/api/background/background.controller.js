const backgroundService = require('./background.service.js')

const logger = require('../../services/logger.service')

async function getBackgrounds(req, res) {
  try {
    logger.debug('Getting Backgrounds')
    const backgrounds = await backgroundService.query()
    res.json(backgrounds)
  } catch (err) {
    logger.error('Failed to get backgrounds', err)
    res.status(500).send({ err: 'Failed to get backgrounds' })
  }
}

async function addBackground(req, res) {
  // const {loggedinUser} = req

  try {
    const background = req.body
    //console.log('background?', background)
    // background.owner = loggedinUser
    const addedBackground = await backgroundService.add(background)
    res.json(addedBackground)
  } catch (err) {
    logger.error('Failed to add background', err)
    res.status(500).send({ err: 'Failed to add background' })
  }
}

async function removeBackground(req, res) {
  try {
    const backgroundId = req.params.backgroundId
    const removedId = await backgroundService.remove(backgroundId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove background', err)
    res.status(500).send({ err: 'Failed to remove background' })
  }
}


module.exports = {
  getBackgrounds,
  addBackground,
  removeBackground
}