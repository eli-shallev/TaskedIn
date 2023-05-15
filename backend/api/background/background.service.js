const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')
const ObjectId = require('mongodb').ObjectId

async function query() {
    try {
        const collection = await dbService.getCollection('customBgDB')
        var backgrounds = await collection.find().toArray()
        //console.log('backgrounds', backgrounds)
        return backgrounds
    } catch (err) {
        logger.error('cannot find backgrounds', err)
        throw err
    }
}

async function remove(backgroundId) {
    try {
        const collection = await dbService.getCollection('customBgDB')
        await collection.deleteOne({ _id: ObjectId(backgroundId) })
        return backgroundId
    } catch (err) {
        logger.error(`cannot remove background ${backgroundId}`, err)
        throw err
    }
}

async function add(background) {
    try {
        const collection = await dbService.getCollection('customBgDB')
        await collection.insertOne(background)
        return background
    } catch (err) {
        logger.error('cannot insert background', err)
        throw err
    }
}


module.exports = {
    remove,
    query,
    add    
}
