import { Router } from 'express'
import * as profileCtrl from '../controllers/profiles.js'


export {
  router
}

const router = Router()
router.get('/:id', isLoggedIn, profileCtrl.show)
router.get('/:id/fridge', isLoggedIn, profileCtrl.showFridge)
router.get('/:id/freezer', isLoggedIn, profileCtrl.showFreezer)
router.get('/:id/list', isLoggedIn, profileCtrl.showList)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}