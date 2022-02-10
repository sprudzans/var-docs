import nextConnect from 'next-connect'
import auth from '../../middleware/auth'
import { deleteUser, createUser, updateUserByUsername } from '../../lib/userDB'

const handler = nextConnect()

handler
  .use(auth)
  .get((req, res) => {
    res.json({ user: req.user })
  })
  .post((req, res) => {
    const { username, password, email } = req.body
    createUser(req, { username, password, email })
    res.status(200).json({ success: true, message: 'created new user' })
  })
  .use((req, res, next) => {
    // handlers after this (PUT, DELETE) all require an authenticated user
    // This middleware to check if user is authenticated before continuing
    if (!req.user) {
      res.status(401).send('unauthenticated')
    } else {
      next()
    }
  })
  .put((req, res) => {
    const { email } = req.body
    const user = updateUserByUsername(req, req.user.username, { email })
    res.json({ user })
  })
  .delete((req, res) => {
    deleteUser(req)
    req.logOut()
    res.status(204).end()
  })

export default handler
