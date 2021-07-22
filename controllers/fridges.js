import { MyFridge } from '../models/fridge.js'

export {
    newFridge as new,
    create,
    index,
}

function newFridge(req, res) {
    res.render('fridge/new', {
      title: "Add Fridge"
    })
  }
  
  function create(req, res) {
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key]
    }
    const myFridge = new MyFridge(req.body)
    fridge.save(function(err) {
      if (err) {
        console.log(err)
        return res.redirect('/fridge/new')
      }
      res.redirect(`/fridge/${fridge._id}`)
    })
  }

  function index(req, res) {
    MyFridge.find({}, function(err, myFridge) {
      res.render('fridge/index', {
        myFridge: myFridge,
        title: 'My Fridge'
      })
    })
  }