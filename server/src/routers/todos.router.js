const express = require('express');
const router=express.Router();
const { addTask,getUsers, getTasks } = require('../services/todos.service');

const app = express();


router.route('/addTask').post(async (req, res) => {
  const { newTask,userId } = req.body;
  await addTask(userId, newTask, err => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while adding the task.');
    } else {
      res.send('Task added successfully.');
    }
  });
});
router.route('/tasks').get( async(req, res) => {
  const userId=req.query.userId;
  let myUsers=await getUsers();
  const user = myUsers.users?.length && myUsers.users.find(u => u.id === userId);
  if(user && user.tasks)
    {
      res.send( user.tasks);
    }
});

module.exports = router;
