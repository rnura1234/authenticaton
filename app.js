const { json } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoute');
const app = express();

const uri = 'mongodb://localhost:27017/authentication';
app.use(express.json())
mongoose.connect(uri).then((con, err) => {
  console.log('database connection successfully');
});

app.use('/api/v1/user', userRouter);
const port = 3000;
app.listen(port, () => {
  console.log(`app is running on the port ${port}`);
});
