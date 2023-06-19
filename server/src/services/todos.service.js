const fs = require('fs');
const path = require('path');
const jsonfile =require('jsonfile');

const filePath=path.join(__dirname, '/data.json')


function writeData(users, callback) {
  try{
    jsonfile.writeFile(filePath, users);
  }
  catch(err){
      console.log(err);
  }  
}

 getUsers=async()=>{
  try {
    const users = await jsonfile.readFile(filePath);
    return users
} catch (error) {
    console.log("error", error);
}
}
// Add a task to a specific user's task array
  addTask=async(userId, newTask, callback)=> {
    
    let myUsers=await getUsers();
    const user = myUsers.users?.length && myUsers.users.find(u => u.id === userId);
    if (user) {
      user.tasks.push(newTask);
      const index = myUsers.users.findIndex(obj => obj.id === userId);
      if(index!=-1){ 
      myUsers.users[index]=user;
      }
    }

    writeData(myUsers, callback);

}


 getTasks=async(userId, callback)=> {
   console.log('im here');
  let myUsers=await getUsers();
  const user = myUsers.users?.length && myUsers.users.find(u => u.id === userId);
  if(user && user.tasks)
    {
      console.log(user.tasks);
      return user.tasks;
    }

}
module.exports = {
    addTask,
    getTasks,
    getUsers
  };
  
