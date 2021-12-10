var express = require('express')
var router = express.Router()
var usersBl = require('../models/usersBL')


router.route('/').get(async (req, resp) => {
    var User = await usersBl.getALL()
    return resp.json(User)
})

router.route('/:id').get(async (req, resp) => {
    var id = req.params.id
    var User = await usersBl.getById(id)
    return resp.json(User)
})

router.route('/').post(async (req, resp) => {
    var newUser = req.body;
    var result = await usersBl.addUsers(newUser)
    return resp.json(result)
})

router.route('/:id').put(async (req, resp) => {
    var id = req.params.id;
    var updateUser = req.body;
    console.log(updateUser);
    var result = await usersBl.updateUsers(updateUser, id);
    return resp.json(result)
})

router.route('/:id').delete(async (req, resp) => {
    var id = req.params.id;
    var result = await usersBl.deleteUsers(id);
    return resp.json(result)
})

module.exports = router