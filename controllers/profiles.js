import { Profile } from '../models/profile.js'

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
    // console.log(Profile.findById(req.params.id))
  //   Profile.
  //   findById(req.params.id).
  //   populate({
  //   path: 'list',
  //   populate: { path: 'food' }
  // }).exec(function(err, profile){
  //   res.render('fridge/showList', {
  //           title: 'My Shopping List', 
  //           profile: profile,
  //           food: food
  // })})
  Profile
.findById(req.params.id)
.populate({
  path: 'list', 
  model: 'list',
  populate: {
    path: 'food',
    model: 'Food'
  }
})
.exec(function(err, profile){
  res.render('fridge/showList', {
          title: 'My Shopping List', 
          profile: profile,
        })
});
    // Profile.findById(req.params.id).list.
    // Profile.findById(req.params.id).list[0]
    // .populate('food').exec(function(err, profile) {
    //   Food.find({_id: {$nin: profile.list[0].food}}, function(err, food) {
    //     res.render('fridge/showList', {
    //       title: 'My Shopping List', 
    //       profile: profile,
    //       food: food
    //     })
    //   })
    // })

    // Profile.findById(req.params.id, function(err, Profile) {
    //   res.render('fridge/showList', {
    //     Profile: Profile,
    //     title: 'My Shopping List'
    //   })
    // })
  }
