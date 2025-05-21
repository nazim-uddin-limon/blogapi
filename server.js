require('dotenv').config()
const http = require('http')
const app = require('./app/app')

const server = http.createServer(app)

server.listen(4000, ()=>{
    console.log('App is listesin on port 4000')
})

