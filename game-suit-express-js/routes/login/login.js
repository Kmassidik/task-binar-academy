const express = require("express")
const router = express.Router()
const fs = require("fs")

let dataUsers = fs.readFileSync("./collectionJson/databaseUser.json","utf-8")
dataUsers = JSON.parse(dataUsers)

router.get("/login",(req,res) => {
    res.render('login',{user:false})
})
router.post("/login",(req,res) => {
    const {username,password} = req.body
    if (!username || !password) {
        res.status(400).send("please fill username or password")
        return;
    }

    const dataUser = dataUsers.find(user => user.username === username)

    if (!dataUser || dataUser.password !== password){
        res.status(404)
        res.render('login',{user:true})
        return;
    } 
    let id = dataUser.id
    res.redirect(`/game/${id}`)
})

module.exports = router