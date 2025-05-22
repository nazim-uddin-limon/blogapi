require('dotenv').config()
const http = require('http')
const app = require('./app/app')
const connection = require('./db/connection')

const server = http.createServer(app)

server.listen(4000, async ()=>{
    await connection()
    console.log('App is listesin on port 4000')
})

