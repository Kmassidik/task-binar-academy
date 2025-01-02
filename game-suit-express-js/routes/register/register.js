const express = require("express")
const router = express.Router()
const fs = require("fs")

let dataUsers = fs.readFileSync("./collectionJson/databaseUser.json","utf-8")
dataUsers = JSON.parse(dataUsers)

router.get('/register', (req, res) => {
    res.render('register',{e:false})
})
router.post('/register', (req, res) => {
    const { username, password, name, email} = req.body
    
    if(!username || !password ){
        res.status(400).send('username or password cant blank')
        return;
    }

    const validationData = dataUsers.find(el => el.username === username)

    if (validationData){
        res.status(404)
        res.render('register',{e:true})
        return;
    }

    let id = dataUsers.length+1
    const newUser = {
        id,
        username, 
        password,
        name,
        email
    }
    dataUsers.push(newUser)
    fs.writeFileSync('./collectionJson/databaseUser.json',JSON.stringify(dataUsers), (err) => {
        if (err) throw err;
    })
    res.redirect('/login')
})

module.exports = router