import { Profile } from '../models/profile.js'
import { User } from '../models/user.js'

export {
    show,
    showFridge,
    showFreezer,
    showList,
}

// function show(req, res) {
//   console.log(req.params.id)
//   res.render('fridge/show', {
//     title: 'My Fridge'
//   })
// }

  function show(req, res) {
    Profile.findById(req.params.id, function(err, Profile) {
      // console.log(Profile)
      res.render('fridge/show', {
        Profile: Profile,
        title: 'My Fridge'
      })
    })
  }
  function showFridge(req, res) {
    Profile.findById(req.params.id, function(err, Profile) {
      res.render('fridge/showFridge', {
        Profile: Profile,
        title: 'My Fridge'
      })
    })
  }
  function showFreezer(req, res) {
    Profile.findById(req.params.id, function(err, Profile) {
      res.render('fridge/showFreezer', {
        Profile: Profile,
        title: 'My Freezer'
      })
    })
  }
  function showList(req, res) {
    Profile.findById(req.params.id, function(err, Profile) {
      res.render('fridge/showList', {
        Profile: Profile,
        title: 'My Shopping List'
      })
    })
  }
