import nextConnect from 'next-connect'

const handler = nextConnect()

handler.get((req, res) => {
    console.log(req.session.passport)
    res.send('ok')
})

export default handler;