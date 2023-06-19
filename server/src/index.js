const express = require('express');
const cors = require('cors');
const loginRouter=require('./routers/login.router');
const taskRouter=require('./routers/todos.router');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/login',loginRouter);
app.use('/tasks',taskRouter);



const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
