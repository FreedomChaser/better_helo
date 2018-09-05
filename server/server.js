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
    // console.log(payload)
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
    const db = req.app.get('db')

    if(DEV_KEY === 'true'){
        let user = await db.find_user(AUTH_ID)
        req.session.userid = user[0].userid
        let {userid} = req.session
        res.status(200).send({userid})
    }else{
        if(userid){
            res.status(200).send({userid})
        }else{
            res.status(401).send('Please Login')
        }
    }
})

app.get('/api/getName', async (req, res) => {
    const db = req.app.get('db')
    let {userid} = req.session

    let name = await db.get_name(userid)
    
    res.status(200).send(name)
})

app.put('/api/updateUser', async (req, res) => {
    console.log('firing')
    const db = req.app.get('db')
    let {userid} = req.session
    var {
        first_name,
        last_name,
        gender,
        hair_color,
        eye_color,
        hobby,
        birth_day,
        birth_month,
        birth_year
    } = req.body
    
    // console.log(first_name.length, last_name.length, gender.length, hair_color.length, eye_color.length, hobby.length, birth_day.length, birth_month.length, birth_year.length)

    console.log(req.body, req.session)
    let updatedUser = await db.update_user(userid, first_name, last_name, gender, hair_color, eye_color, hobby, birth_day, birth_month, birth_year)


    console.log(updatedUser)
    var {first_name, last_name} = updatedUser[0]
    let sentUser = {first_name, last_name}

    res.status(200).send(sentUser)
})

app.get('/api/logout', (req, res) => {
    req.session.destroy()
})


app.listen(SERVER_PORT, () => {
    console.log(`spellbound on port ${SERVER_PORT}`)
})