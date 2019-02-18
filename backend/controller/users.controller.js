'use strict';
const COLLECTION = "users";
const Random = require('randomstring');

class UserController {
    constructor() {
        this.loginUser = this.loginUser.bind(this);
    }

    loginUser(req, res) {
        res.send({message: 'Login router'})
    }
}

module.exports = UserController;
