'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Morgan = require('morgan');
require('dotenv').config();

const Routes = require('./backend/routers');

class SampleApp {
    constructor() {
        this.app = express();
        this.ENVIRONMENT = process.env.NODE_ENVIRONMENT;

        this.PORT = process.env[this.ENVIRONMENT + '_SERVER_PORT'];

        this.handleError = this.handleError.bind(this);
    };

    handleError(error) {
        console.log(error)
    }


    assignMiddleWares() {
        //Log Http Requests in console
        this.app.use(Morgan('dev'));

        //Cross Domain origin request handler
        this.app.use(cors());

        //Body parsers * to json parser
        this.app.use(bodyParser.json({limit: '999mb', parameterLimit: 1000000}));
        this.app.use(bodyParser.urlencoded({limit: '999mb', extended: true, parameterLimit: 1000000}));
    }

    assignRoutes() {
        //Serving static files
        this.app.use('/', express.static('static'));

        this.app.use('/api/user', new Routes.User().routes());
    }

    start() {
        this.assignMiddleWares();
        this.assignRoutes();
        this.app.listen(this.PORT, () => {
            console.info('Server started on ', this.PORT);
        }).on('error', this.handleError);
    }
}


new SampleApp()
    .start();
