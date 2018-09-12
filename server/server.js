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

// app.get('/api/getName', async (req, res) => {
//     const db = req.app.get('db')
//     let {userid} = req.session

//     let name = await db.get_name(userid)
    
//     res.status(200).send(name)
// })

app.put('/api/updateUser', async (req, res) => {
    // console.log('firing')
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

    // console.log(req.body, req.session)
    let updatedUser = await db.update_user(userid, first_name, last_name, gender, hair_color, eye_color, hobby, birth_day, birth_month, birth_year)

    // console.log(updatedUser)
    var {first_name, last_name} = updatedUser[0]
    let sentUser = {first_name, last_name}

    res.status(200).send(sentUser)
})

app.get('/api/getUser', async (req, res) => {
    const db = req.app.get('db')
    let {userid} = req.session

    // console.log(userid)
    let gottenUser = await db.get_user(userid)

    // console.log('user', gottenUser[0])

    let {first_name, last_name, gender, hair_color, eye_color, hobby, birthday, birth_month, birth_year} = gottenUser[0]
    let user = {first_name, last_name, gender, hair_color, eye_color, hobby, birthday, birth_month, birth_year}

    res.status(200).send(user)
})

// finish building out endpoint
app.get('/api/getAllNotFriends/:off', async (req, res) => {
    const db = req.app.get('db')
    var {userid} = req.session
    let {off} = req.params

    let count = await db.query(
        `select count(*) from helousers where userid <> $1 and helousers.userid not in (select friendid from helofriends where userid = ${userid})`, [userid]
    )
    
    let allNots = await db.query(
        `select * from helousers where userid <> $1 and helousers.userid not in (select friendid from helofriends where userid = ${userid}) order by userid offset $2 limit 12`, [userid, off]
    )
    // console.log(allNots)
    
    // var {userid, first_name, last_name} = allNots
    // let notFriend = {userid, first_name, last_name}
    // console.log(notFriend)
    res.send({count, allNots})
})

app.get('/api/reqFriends/:key/:value', async (req, res) => {
    //a db request that gets users who don't match the nested friend ids or the userid
    // console.log('firing')
    const db = req.app.get('db')
    let {userid} = req.session
    //needs further destructuring: column name and value
    let {key, value} = req.params
    // console.log(key, value, userid)
    let reqFriends = await db.query(
        `select * from helousers where ${key} = $1 and userid <> $2 and helousers.userid not in (select friendid from helofriends where userid = ${userid})`, [value, userid]
    )
    // let reqFriends = await db.get_req_friends([userid, key, value])
    // console.log(reqFriends)
    // var {userid, first_name, last_name} = reqFriends[0]
    // let user = {userid,first_name, last_name}

    res.send(reqFriends)
})

app.post('/api/addFriend/:id', async (req, res) => {
    const db = req.app.get('db')
    let {userid} = req.session
    let {id} = req.params
    console.log(userid, id)
    //this adds to heloFriends table
    let addedFriend = await db.add_friend(userid, id)
    let notSet = await db.set_not_friends(userid)
    let reSet = await db.set_friends(userid)
    
    res.sendStatus(200)
})

app.delete('/api/removeFriend/:id', async (req, res) => {
    const db = req.app.get('db')
    let {userid} = req.session
    let {id} = req.params

    let removedFriend = await db.remove_friend(userid, id)
    let notSet = await db.set_not_friends(userid)
    let reSet = await db.set_friends(userid)

    res.sendStatus(200)
})

app.get('/api/searchVal/:val/:off', async (req, res) => {
    // console.log('val firing')
    const db = req.app.get('db')
    let {userid} = req.session
    let {val, off} = req.params

    let notSet = await db.set_not_friends(userid)
    let reSet = await db.set_friends(userid)
    let count = await db.get_count_by_val(userid, val)
    let allValMatches = await db.get_by_val(userid, val, off)

    res.send({count, allValMatches})
})

app.get('/api/searchBoth/:val/:name/:off', async (req, res) => {
    const db = req.app.get('db')
    let {userid} = req.session
    let {val, name, off} = req.params

    let notSet = await db.set_not_friends(userid)
    let reSet = await db.set_friends(userid)
    let count = await db.query(
        `select * from helousers where ${val} = $3 and userid <> $1`, [userid, val,name])  
    let bothMatches = await db.query(
        `select * from helousers where ${val} = $3 and userid <> $1 order by userid offset $4 limit 12`, [userid, val, name, off]) 
    // let bothMatches = await db.get_by_both(userid, val, name)

    res.send({count, bothMatches})
})

    //let db req for total num of users
    //on front end render btns based on total divided by 24
    //gives number use number to create an array of buttons
    //onclick pass button index number multiplied by 24 back to controller make call with that num as offset
    //buttons function hit same end point
    //let db req for first 24

//references getAllNotFriends
// app.get('/api/resetUsers', async (req,res) =>{
//     const db = req.app.get('db')
//     let {userid} = req.session

//     let resetCount = await db.query(
//         `select count(*) from helousers where userid <> $1 and helousers.userid not in (select friendid from helofriends where userid = ${userid})`, [userid]
//     )
//     // console.log(resetCount)
//     res.send({resetCount})
// })

//bracket notation
//query 1-get all the friend idnums in array
//query 2- get matching data for column and value
//send both to the front as arrays
//on the front end filter through where column id does not equal idnums

app.get('/api/logout', (req, res) => {
    req.session.destroy()
})


app.listen(SERVER_PORT, () => {
    console.log(`spellbound on port ${SERVER_PORT}`)
})