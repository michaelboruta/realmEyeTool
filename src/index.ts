#!/usr/local/bin/ts-node-dev index.ts
import http from 'http'
import { getSummary } from './functions/getSummary'
import { getExaltations } from './functions/getExaltations'

const PORT = 42069
const HOSTNAME = '0.0.0.0'

// TODO handle player not found
const server = http.createServer(async (req, res) => {
    const reqUrlObj = req.url?.split('=')
    if (!reqUrlObj) { res.end('error. invalid req url'); return }
    
    // /route=username
    const reqUrl = reqUrlObj[0]
    const username = reqUrlObj[1]

    if (reqUrlObj.length != 2) { 
        res.statusCode = 404;
        res.end('error. cant parse route and username. expected /summary=username or /exaltations=username, got: '+req.url); return 
    }

    switch(reqUrl) {
    
        case '/summary': {
            const summary = await getSummary(username)
            res.statusCode = 200
            res.end(JSON.stringify(summary))
            break
        }
    
        case '/exaltations': {
            const exaltations = await getExaltations(username)
            res.statusCode = 200
            res.end(JSON.stringify(exaltations))
            break
        }
    
        default: {
            res.statusCode = 404
            res.end('error. invalid route '+reqUrl);
            break    
        }
    
    }

})

server.listen(PORT, HOSTNAME, () => {
    console.log(`realmEyeTool ready.`)
    console.log(`Listening to http://${HOSTNAME}:${PORT}`)
})