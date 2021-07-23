import { Router } from 'express'
import * as profileCtrl from '../controllers/profiles.js'


export {
  router
}

const router = Router()
router.get('/:id', profileCtrl.show)
router.get('/:id/fridge', profileCtrl.showFridge)
router.get('/:id/freezer', profileCtrl.showFreezer)
router.get('/:id/list', profileCtrl.showList)
