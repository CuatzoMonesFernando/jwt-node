import express from 'express'

import { authJwt } from './../middlewares'

import products from './products.routes'
import auth from './auth.routes'

const app = express()

app.use('/products', [ authJwt.verifyToken ], products)
app.use('/auth', auth)

export default app

// var express = require('express')
// var router = express.Router()
// const authMiddleware = require('../middleware/auth')

// express.application.prefix = express.Router.prefix = function(path, middleware, configure) {
//     configure(router);
//     this.use(path, middleware, router);
//     return router;
// }


// router.prefix('/user', authMiddleware, async function (user) {
//     user.route('/details').get(function(req, res) {
//         res.status(201).send('Hello this is my personal details')
//     }); //also you can use controller method if you have any
// });

// module.exports = router 