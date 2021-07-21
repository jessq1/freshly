import { Router } from 'express'
import * as foodCtrl from '../controllers/food.js'


export {
  router
}

const router = Router()
router.get('/', foodCtrl.index)
router.get('/new', foodCtrl.new)

router.get('/:id', foodCtrl.show);
router.post('/', foodCtrl.create)