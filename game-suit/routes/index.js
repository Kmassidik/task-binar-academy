const express = require("express")
const router = express.Router()
const home = require('./home/home')
const login = require('./login/login')
const game = require('./game/game')
const register = require('./register/register')

router.use('/',home)
router.get('/game',game) 
router.get('/game/:id',game) 

router.get('/register',register)
router.post('/register',register)

router.get('/login',login)
router.post('/login',login)

module.exports = router