import { storageService } from "./async-storage.service"
import { httpService } from './http.service.js'

export const uploadService = {
  uploadImg,
  getUploadedCollection,
  removeFromUploadedCollection,
  saveUploadedCollection
}

function uploadImg(ev) {

  const CLOUD_NAME = "dlhh3aon3"
  const UPLOAD_PRESET = "TaskedIn"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const formData = new FormData()
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('file', ev.target.files[0])

  return fetch(UPLOAD_URL, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(res => {
      return res
    })
    .catch(err => console.error(err))
}

async function saveUploadedCollection(collection, data) {
  // return await storageService.post(collection, data)
  return await httpService.post(collection, data)
}

async function getUploadedCollection(collection) {
  // return await storageService.query(collection)
  return await httpService.get(collection)
}

async function removeFromUploadedCollection(collection, dataId) {
  // await storageService.remove(collection, dataId)
  await await httpService.delete(collection, dataId)
}
