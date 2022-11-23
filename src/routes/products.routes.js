import { Router } from 'express'
const router = Router()
import * as productCtrl from './../controllers/products.controller'
import {authJwt} from './../middlewares'

router.get('/', productCtrl.getProducts)

router.post('/', [authJwt.verifyToken, authJwt.isModerator], productCtrl.createProduct)

router.get('/:productID', productCtrl.getProduct)

router.put('/:productID', productCtrl.updateProduct)

router.delete('/:productID', [authJwt.verifyToken, authJwt.isAdmin], productCtrl.deleteProduct)

export default router
