const express = require('express');
const app = express();

app.use(express.json())

// routers
const userRouter = require('./user/routes');

// routes:
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});



app.listen(8000, () => {
    console.log('🚀 Server is running!');
})