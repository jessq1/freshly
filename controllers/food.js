import { Food } from '../models/food.js'
import { Profile } from '../models/profile.js'

import axios from 'axios'

export {
    newFood as new,
    create,
    index,
    show,
    deleteFood as delete,
    edit,
    update,
    addToList,
}

function addToList(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile=>{
    profile.list[0].food.push({_id:req.params.id})
    console.log(profile.list[0])
    profile.save()
    .then(()=> {
      res.redirect(`/food`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
}
function newFood(req, res) {
    res.render('food/new', {
      title: "Add Food"
    })
  }
  
  function create(req, res) {
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key]
    }
    const food = new Food(req.body)
    console.log(req.body)
    food.save(function(err) {
      if (err) {
        console.log(err)
        return res.redirect('/food/new')
      }
      res.redirect(`/food/${food._id}`)
    })
  }
  
  function index(req, res) {
    Food.find({}, function(err, food) {
      res.render('food/index', {
        food: food,
        title: 'All Food'
      })
    })
  }
  
  function show(req, res) {
    Food.findById(req.params.id)
    .then(food=>{
      res.render('food/show', {
        title: 'Food Detail', 
        food: food,
      })
    })
  }
  
  function deleteFood(req,res){
    Food.findByIdAndDelete(req.params.id, function(err, food) {
      res.redirect('/food')
    })
  }

  function edit(req,res){
    Food.findById(req.params.id, function(err, food) {
      res.render('food/edit', {
        food,
        err,
        title: "Edit Food"
      })
    })
  }
  
  function update(req,res){
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key]
    }
    Food.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, food) {
      res.redirect(`/food/${food._id}`)
    })
  }