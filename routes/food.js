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

router.delete('/:id',foodCtrl.delete)
router.get("/:id/edit",foodCtrl.edit)
router.put("/:id",foodCtrl.update)

router.get('/:id/addtolist', isLoggedIn, foodCtrl.addToList)

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}