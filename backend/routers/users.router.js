'use strict';
const Router = require('express').Router({});
const UserController = require('../controller/users.controller');


class UserRoutes {
    constructor() {
        this.controller = new UserController();
    }

    routes() {
        return Router
            .post('/login', this.controller.loginUser)
    }
}

module.exports = UserRoutes;
