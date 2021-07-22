import { Router } from 'express'
import * as frigdeCtrl from '../controllers/fridges.js'


export {
  router
}

const router = Router()
router.get('/', frigdeCtrl.index)