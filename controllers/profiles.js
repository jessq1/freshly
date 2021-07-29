import { Profile } from '../models/profile.js'

import axios from 'axios'

export {
    show,
    showFridge,
    showFreezer,
    showList,
    submitList,
    removeFromFridge,
    editFridge,
    updateFridge,
    searchFridge,
}

function editFridge(req,res) {
  Profile.findById(req.params.id, function(err, profile) {
    const foodItem = profile.fridgeFood.id(req.query.id)
    res.render('fridge/edit', {
      profile,
      foodItem,
      err,
      title: "Edit Profile"
    })
  })
}

function updateFridge(req,res) {
  let fId=req.body.id
  let fservings=req.body.servings
  console.log(fId)
  console.log(fservings)
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Profile.findById(req.params.id, function(err,profile){
    profile.fridgeFood.id(fId).servings = fservings
    profile.save(function(err) {
    res.redirect(`/myfridge/${profile._id}/fridge/`)
  })})
}

function removeFromFridge(req,res){
  const fId = req.body.id
  console.log(fId)
  Profile
    .findById(req.params.id, function(err,profile){
      profile.fridgeFood.id(fId).remove();
      profile.save(function(err) {
        res.redirect(`/myfridge/${profile._id}/fridge`)
      })
    })
}

  function show(req, res) {
    let today = new Date()
    today.setUTCHours(0,0,0,0)
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

  function searchFridge(req, res) {
    let today = new Date()
    today.setUTCHours(0,0,0,0)
    Profile.findById(req.params.id, function(err, Profile) {
      axios.get(`https://api.edamam.com/search?q=${req.body.search}&app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}&from=0&to=3`)
    .then(response => {
        Profile.fridgeFood.forEach((food) => {
          food.freshness=((((today-food.purchaseDate)/86400000)/(food.fridgeM*30+food.fridgeW*7+food.fridgeD))*100).toFixed()
      })
      Profile.freezerFood.forEach((food) => {
        food.freshness=((((today-food.purchaseDate)/86400000)/(food.freezeM*30+food.freezeW*7+food.freezeD))*100).toFixed()
      })
        res.render('fridge/showFridge', {
          Profile: Profile,
          result: response.data.hits,
          title: 'My Fridge',
        })
      })
      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
    })
  }

  function showFridge(req, res) {
    let today = new Date()
    today.setUTCHours(0,0,0,0)
    Profile.findById(req.params.id, function(err, Profile) {
      axios.get(`https://api.edamam.com/search?q=${Profile.fridgeFood[0].name}&app_id=${process.env.API_ID}&app_key=${process.env.API_KEY}&from=0&to=3`)
      .then(response => {
          Profile.fridgeFood.forEach((food) => {
            food.freshness=((((today-food.purchaseDate)/86400000)/(food.fridgeM*30+food.fridgeW*7+food.fridgeD))*100).toFixed()
        })
        Profile.freezerFood.forEach((food) => {
          food.freshness=((((today-food.purchaseDate)/86400000)/(food.freezeM*30+food.freezeW*7+food.freezeD))*100).toFixed()
        })
          res.render('fridge/showFridge', {
            Profile: Profile,
            result: response.data.hits,
            title: 'My Fridge',
          })
        })
    })
  }
  
  function showFreezer(req, res) {
    let today = new Date()
    today.setUTCHours(0,0,0,0)
    Profile.findById(req.params.id, function(err, Profile) {
      Profile.fridgeFood.forEach((food) => {
          food.freshness=((((today-food.purchaseDate)/86400000)/(food.fridgeM*30+food.fridgeW*7+food.fridgeD))*100).toFixed()
      })
      Profile.freezerFood.forEach((food) => {
        food.freshness=((((today-food.purchaseDate)/86400000)/(food.freezeM*30+food.freezeW*7+food.freezeD))*100).toFixed()
      })
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
    console.log(req.body.purchaseDate)
    if(req.body.inFridge == 'true'){
      Profile
    .findById(req.params.id)
    .populate({
    path: 'list', 
    model: 'list',
    })
    .exec(function(err, profile){
      profile.fridgeFood.push(req.body)
      profile.list[profile.list.length-1].food.pull({_id:req.body.foodId})
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
      profile.list[profile.list.length-1].food.pull({_id:req.body.foodId})
      profile.save(function(err) {
        res.redirect(`/myfridge/${profile._id}/list`)
      })
    });
    } else {
      res.redirect(`/myfridge/${profile._id}/list`)
    }
  }
