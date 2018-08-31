require('dotenv').config()
const express = require('express')
const session = require('express-session')
const axios = require('axios')
const massive = require('massive')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const {
    SERVER_PORT,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    CONNECTION_STRING,
    SESSION_SECRET,
    DEV_KEY,
    AUTH_ID
}= process.env

app.use(session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})

app.get('/auth/callback', async (req, res) => {
    let payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`
    }
    console.log(payload)
    // console.log('env', process.env)
    let resWithToken = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload)
    // console.log('token', resWithToken)
    let resWithUserData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo/?access_token=${resWithToken.data.access_token}`)

    const db = req.app.get('db')
    let {sub} = resWithUserData.data
    
    let foundUser = await db.find_user([sub])

    if(foundUser[0]){
        req.session.userid = foundUser[0].userid
        res.redirect('/#/dashboard')
    }else{
        let createdUser = await db.create_user(sub)
        req.session.userid = createdUser[0].userid
        res.redirect('/#/dashboard')
    }
})

app.get('/api/userData', async (req, res) => {
    if(DEV_KEY === 'true'){
        let user = await req.app.get('db').find_user([AUTH_ID])
        req.session.userid = user[0].userid
        res.status(200).send(req.session.userid)
    }else{
        if(req.session.userid){
            res.status(200).send(req.session.userid)
        }else{
            res.status(401).send('Please Login')
        }
    }
})

app.get('/api/logout', (req, res) => {
    req.session.destroy()
})


app.listen(SERVER_PORT, () => {
    console.log(`spellbound on port ${SERVER_PORT}`)
})