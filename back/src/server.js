const express = require('express')
const app = express()

const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swagger')

app.use(express.json())
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// routers
const userRouter = require('./routes/User.routes')
const exerciseRouter = require('./routes/Exercise.routes')
const workoutRouter = require('./routes/Workout.routes')
const workoutExerciseRouter = require('./routes/Workout-exercise.routes')
const workoutExerciseSETRouter = require('./routes/Workout-exercise-SET.routes')

app.use('/users', userRouter)
app.use('/exercises', exerciseRouter)
app.use('/workouts', workoutRouter)
app.use('/workout-exercises', workoutExerciseRouter)
app.use('/workout-exercise-sets', workoutExerciseSETRouter)

app.get('/', (req, res) => {
    res.send('Hello World!')
});

module.exports = app;