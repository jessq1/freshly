import { Food } from '../models/food.js'
import axios from 'axios'

export {
    newFood as new,
    create,
    index,
    show,
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
    .populate('airport').exec(function(err, food) {
      Destination.find({_id: {$nin: food.airport}}, function(err, destinations) {
        res.render('food/show', {
          title: 'Food Detail', 
          food: food,
          destinations: destinations
        })
      })
    })
  }