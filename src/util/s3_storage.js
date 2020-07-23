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

export const uploadImage = async (file) => {
  try {
    const u = await isAuth()
    if (!u) return
    const r = await Storage.put('/2342211/example.png', file, { contentType: 'image/png' })
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

export const deleteImage = () => {

}
