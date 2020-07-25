import Amplify, { Auth, Storage } from 'aws-amplify'
import awsconfig from '../aws-exports'

Amplify.configure(awsconfig)

const isAuth = async () => {
  try {
    const u = await Auth.currentUserInfo()
    if (!u) {
      await Auth.signIn('cws-ghost', 'LAG3PZTPuM.BQ28gEXpe.s3UwF8GirPf')
    }
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

export const buildKey = (segments) => {
  return segments.join('/')
}

export const uploadImage = async (key, file) => {
  try {
    const u = await isAuth()
    console.log(u)
    if (!u) return
    const r = await Storage.put(key, file, { contentType: 'image/png' })
    console.log(r)
  } catch (e) {
    console.log(e)
  }
}

export const getObject = async (key, progressCallback) => {
  try {
    const u = await isAuth()
    if (!u) return
    const url = await Storage.get(key)
    return url
  } catch (e) {
    console.log(e)
  }
}

export const deleteImage = async (key) => {
  try {
    const u = await isAuth()
    if (!u) return
    await Storage.delete(key)
    return
  } catch (e) {
    console.log(e)
  }
}
