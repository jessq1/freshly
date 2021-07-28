import { Profile } from '../models/profile.js'

export {
    show,
    showFridge,
    showFreezer,
    showList,
    submitList,
}

  function show(req, res) {
    let today = new Date()
    Profile
    .findById(req.params.id)
    .populate({
      path: 'fridgeFood',
      path: 'freezerFood',
    path: 'list', 
    model: 'list',
    populate: {
      path: 'food',
      model: 'Food'
    }
    })
    .exec(function(err, Profile){
      Profile.fridgeFood.forEach((food) => {
        food.freshness=((((today-food.purchaseDate)/86400000)/(food.fridgeM*30+food.fridgeW*7+food.fridgeD))*100).toFixed()
      })
      Profile.freezerFood.forEach((food) => {
        food.freshness=((((today-food.purchaseDate)/86400000)/(food.freezeM*30+food.freezeW*7+food.freezeD))*100).toFixed()
      })
    res.render('fridge/show', {
            title: 'My Fridge', 
            Profile: Profile,
          })
    });
  }

  function showFridge(req, res) {
    let today = new Date()
    Profile.findById(req.params.id, function(err, Profile) {
      Profile.fridgeFood.forEach((food) => {
        food.freshness=((((today-food.purchaseDate)/86400000)/(food.fridgeM*30+food.fridgeW*7+food.fridgeD))*100).toFixed()
      })
      Profile.freezerFood.forEach((food) => {
        food.freshness=((((today-food.purchaseDate)/86400000)/(food.freezeM*30+food.freezeW*7+food.freezeD))*100).toFixed()
      })
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
  }

  function submitList(req, res) {
    if(req.body.inFridge == 'true'){
      Profile
    .findById(req.params.id)
    .populate({
    path: 'list', 
    model: 'list',
    })
    .exec(function(err, profile){
      profile.fridgeFood.push(req.body)
    console.log(profile.list[profile.list.length-1].food)
      // profile.list[profile.list.length-1].food.id(req.body.foodId).remove()
      console.log(profile.fridgeFood)
      profile.save(function(err) {
        res.redirect(`/myfridge/${profile._id}/list`)
      })
    });
    } else if (req.body.inFreezer == 'true'){
      Profile
    .findById(req.params.id)
    .populate({
    path: 'list', 
    model: 'list',
    })
    .exec(function(err, profile){
      profile.freezerFood.push(req.body)
    console.log(profile.list[profile.list.length-1].food)
      profile.save(function(err) {
        res.redirect(`/myfridge/${profile._id}/list`)
      })
    });
    } else {
      console.log(req.body)
    }

    // Profile.findById(req.params.id, function(err, profile) {
    //   profile.food.push(req.body)
    //   profile.save(function(err) {
    //     res.redirect(`/myfridge/${profile._id}/list`)
    //   })
    // })
  }
