const _  = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const Task = mongoose.model('tasks');
const User = mongoose.model('users');
module.exports = app =>{
//Get all the tasks belongs to User 1
app.get('/api/tasks/', async (req, res) =>{
    var query = {};
    query._user = "5d11b0425702121e56fa11b1";
    if(req.query.isCompleted){
      if(req.query.isCompleted == 100){
        query.completedPct = 100;
      }else if(req.query.isCompleted == 0){
        query.completedPct = { $ne: 100 };
      }
    }
    if(req.query.isPast){
      if(req.query.isPast == 0){
        query.taskDate = { $gt: new Date() }
      }else if(req.query.isPast == 1){
        query.taskDate = { $lt: new Date() };
      }
    }

    if(req.query.fromDate){
      try{
        var fromDate = parseInt(req.query.fromDate);
        if(fromDate != 0){
          //console.log("req.query.fromDate: "+ new Date());
          if(query.taskDate)
            query.taskDate["$gt"]= new Date(fromDate);
          else {
            query.taskDate = { $gt: new Date(fromDate) }
          }
        }
      }catch(e){}
    }

    if(req.query.toDate){
      try{
        var toDate = parseInt(req.query.toDate);
        if(toDate != 0){
          //console.log("req.query.fromDate: "+ new Date());
          if(query.taskDate)
            query.taskDate["$lt"]= new Date(toDate);
          else {
            query.taskDate = { $lt: new Date(toDate) }
          }
        }
      }catch(e){}
    }
    //console.log(query.taskDate)
    const tasks = await Task.find(query);
    //  .select({ recipients: false});
    res.send(tasks);
});
//Get one task
app.get('/api/tasks/:taskId/', async (req, res) =>{

  const task = await Task.findById(req.params.taskId);
  res.send(task);
});

  //Create a new Task.
  app.post('/api/tasks', async (req, res) => {

    const { subject, description, taskDate, taskType, completedPct } = req.body;
    const user = new User({
      id: 1,
      firstName: "Lingchao",
      lastName: "Kong"
    })
    const task = new Task({
      subject,
      description,
      _user: "5d11b0425702121e56fa11b1",
      _assignTo: "5d11b0425702121e56fa11b1",
      createdDate: Date.now(),
      taskDate: taskDate,
      taskType,
      completedPct,
      status: 1
    });

    try{
      await task.save();
      res.send(task);
    }catch (err){
      res.send(err);
    }
  });
  //Edit one task
  app.post('/api/tasks/:taskId/', async (req, res) => {
    var query = {};
    if(req.body.subject){
      query.subject = req.body.subject;
    }
    if(req.body.description){
      query.description = req.body.description;
    }
    if(req.body.taskDate){
      query.taskDate = req.body.taskDate;
    }
    if(req.body.completedPct){
      query.completedPct = req.body.completedPct;
    }
    console.log(query)
    Task.updateOne({
        _id: req.params.taskId,
        _user: "5d11b0425702121e56fa11b1"
      }, query).exec();
    res.send("success");
  });
  //Edit one task
  app.delete('/api/tasks/:taskId/', async (req, res) => {

  //  const { _user} = req.body;
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _user: "5d11b0425702121e56fa11b1"
      }).exec();
    res.send("deleted successfully");
  });
};
