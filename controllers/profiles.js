import { Profile } from '../models/profile.js'

export {
    show,
    showFridge,
    showFreezer,
    showList,
}

  function show(req, res) {
    Profile.find(req.params.id, function(err, Profile) {
      res.render('fridge/show', {
        Profile: Profile,
        title: 'My Fridge'
      })
    })
  }
  function showFridge(req, res) {

  }
  function showFreezer(req, res) {
    
  }
  function showList(req, res) {
    
  }
