const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const express = require('express');


const secretKey = 'mysecretkey';
const router=express.Router();


router.route('/auth').post( async (req, res) => {
  const { username, ID } = req.body;

  try {
    const jsonData = await fs.readFile('../services/data.json', 'utf-8');
    const data = JSON.parse(jsonData);

    const user = data.users.find(u => u.name === username && u.id === ID);

    if (user) {
      const token = jwt.sign({ username }, secretKey);
      res.set('Authorization', `Bearer ${token}`);
      data.currentUser = user;
      await fs.writeFile('data.json', JSON.stringify(data));
      res.json({user,token});
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
