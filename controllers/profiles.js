import { Profile } from '../models/profile.js'

export {
    show,
}

  function show(req, res) {
    Profile.find({}, function(err, Profile) {
      res.render('fridge/index', {
        Profile: Profile,
        title: 'My Fridge'
      })
    })
  }