const { Router } = require('express');
const router = Router();
const Machine = require('../database/schemas/packageMachine');

router.post('/machine-data', (req, res) => {
  Machine.findById(req.body.id, (err, doc) => {
    if(err) res.status(400).json({msg: err});
    res.status(200).json({data: doc});
  });
});

router.post('/dropOff', (req, res) => {
  Machine.findByIdAndUpdate(req.body.id , {data: req.body.data},{ new: true }, (err, doc) => {
    if(err) res.status(400).json({msg: err});
    res.status(200).json({data: doc});
  });
});



// router.get('/my-projects', (req, res) => {
//   // console.log(req.user.username)
//   if(!req.user) res.status(403).json({msg: 'Not authorized!'});

//   //maybe I should change to _id
//   Project.find({"assignedTo.username": req.user.username}, (err, docs) => {
//     if(err) res.json({msg: err})
//     res.json({projects: docs})
//   })
// });

// router.post('/new-ticket', (req, res) => {
//   if(!req.user) res.status(403).json({msg: 'Unauthorized'})
//   const ticketObj = {
//     title: req.body.title,
//     priority: req.body.priority,
//     description: req.body.description
//   }
//   Project.findByIdAndUpdate({_id: req.body.projectId}, {$push: {tickets: ticketObj}}, (err, doc) => {
//     if(err) res.status(400).json({fail: err})
//     res.status(200).json({success: 'Ticket added to the project!'});
//   })
// });

module.exports = router;
