const express = require("express")
const router = express.Router()
const fs = require("fs")

let dataUsers = fs.readFileSync("./collectionJson/databaseUser.json","utf-8")
dataUsers = JSON.parse(dataUsers)

router.get("/game",(req,res) => {
    res.redirect('login')
})
router.get("/game/:id",(req,res) => {
    const id = dataUsers[req.params.id-1]
    const reqId = req.params.id

    if (reqId > dataUsers.length) {
        res.redirect('/login')
        return
    }
    let name = id.name
    res.render('game',{ name })
})

module.exports = router