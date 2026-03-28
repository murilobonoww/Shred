const express = require('express')
const app = express()

app.use(express.json())

// routers
const userRouter = require('./routes/User.routes')
const exerciseRouter = require('./routes/Exercise.routes')
const workoutRouter = require('./routes/Workout.routes')
const workoutExerciseRouter = require('./routes/Workout-exercise.routes')
const workoutExerciseSETRouter = require('./routes/Workout-exercise-SET.routes')

app.use('/user', userRouter)
app.use('/exercise', exerciseRouter)
app.use('/workout', workoutRouter)
app.use('/workout-exercise', workoutExerciseRouter)
app.use('/workout-exercise-set', workoutExerciseSETRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
});



app.listen(8000, () => {
    console.log('🚀 Server is running!')
})