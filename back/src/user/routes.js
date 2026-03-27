const { PrismaClient } = require('@prisma/client');
const { Router } = require('express');
const router = Router();

const prisma = new PrismaClient()


router.delete('/workoutExerciseSet/:id', async (req, res) => {
    const { id } = req.params

    try {
        await prisma.workoutExerciseSet.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(200).send({ msg: 'Deleted successfully!' })
    } catch (error) {
        res.status(500).send({ msg: 'Operation failed', details: error.message })
    }
})

router.post('/workoutExerciseSet/:workoutExerciseId', async (req, res) => {
    const { workoutExerciseId } = req.params
    const { order } = req.body
    try {
        await prisma.workoutExerciseSet.create({
            data: {
                reps: 0,
                weight: 0,
                order: Number(order),
                workoutExerciseId: Number(workoutExerciseId)
            }
        })
        res.status(201).send({ msg: 'Set of workout exercise created!' })
    } catch (error) {
        res.status(500).send({ error: 'Operation failed :(', details: error.message })
    }
})

router.delete('/workoutExercise/:id', async (req, res) => {
    const { id } = req.params

    try {
        await prisma.workoutExercise.delete({ where: { id: parseInt(id) } })
        res.status(200).send({ msg: 'Workout exercise deleted sucessfully!' })
    } catch (error) {
        res.status(500).send({ error: 'Operation failed :(', details: error.message })
    }
})

// LEMBRAR DE TIRAR O MOCK DO EXERCISE NAME 
router.post('/workoutExercise/:exerciseId/:workoutId', async (req, res) => {
  const { workoutId, exerciseId } = req.params

  try {
    const newWorkoutExercise = await prisma.workoutExercise.create({
      data: {
        workoutId: Number(workoutId),
        exerciseId: Number(exerciseId),
        exerciseName: "Exercício",
        order: 0
      }
    })

    res.status(201).send(newWorkoutExercise)
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong', details: error.message })
  }
})

router.get('/exercises', async (req, res) => {
    try {
        const exercises = await prisma.exercise.findMany()
        res.status(200).send(exercises)
    } catch (error) {
        res.status(500).send({ error: 'Operation failed :(', details: error.message })
    }
})

router.post('/new-exercise', async (req, res) => {
    const { name } = req.body

    try {
        await prisma.exercise.create({ data: { name } })
        res.status(201).send({ msg: 'Exercise created!' })
    } catch (error) {
        res.status(500).send({ error: 'Operation failed :(', details: error.message })
    }
})

// Update workout name
router.put('/workoutName/:workoutId', async (req, res) => {
    const { workoutId } = req.params
    const { name } = req.body

    try {
        const updated = await prisma.workout.update({
            where: { id: parseInt(workoutId) },
            data: { name }
        })
        res.status(200).send(updated)
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong', details: error.message })
    }
})

// Update a specific exercise inside a workout
// router.put('/workout-exercise/:id', async (req, res) => {
//     const { id } = req.params
//     const { weight, reps, rir, failed, restTime, order } = req.body

//     try {
//         const updated = await prisma.workoutExercise.update({
//             where: { id: parseInt(id) },
//             data: { weight, reps, rir, failed, restTime, order }
//         })
//         res.status(200).send(updated)
//     } catch (error) {
//         res.status(500).send({ error: 'Something went wrong', details: error.message })
//     }
// })

router.get('/workouts/:userID', async (req, res) => {
    const { userID } = req.params

    try {
        const user_workouts = await prisma.workout.findMany({ where: { userId: parseInt(userID) } })
        res.status(200).send(user_workouts)
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong :(', details: error.message })
    }
})

router.post('/new-workout/:userID', async (req, res) => {
    const { userID } = req.params

    try {
        await prisma.workout.create({ data: { userId: parseInt(userID) } })
        res.status(200).send({ msg: 'Workout created!' })
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong :(', details: error.message })
    }
})


// CRUD:
/////////////////////////////////////////////////////////////////////////////////////////////

router.get('/', async (req, res) => {
    const users = await prisma.user.findMany()
    res.status(200).send(users);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(id) } })
        if (!user) return res.status(404).send({ error: 'User not found' })
        res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: 'Something went wrong :(', details: error.message })
    }
})

router.post('/', async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(400).send({ error: 'Missing required fields' })

    try {
        const newUser = await prisma.user.create({ data: { name, email, password } })
        res.status(201).send(newUser)
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong' })
    }
});

router.put('/:id', async (req, res) => {
    const { name, email, password } = req.body
    const { id } = req.params

    if (!name && !email && !password) return res.status(400).send({ error: 'Missing at least one field' })

    try {
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { name, email, password }
        })

        res.status(200).send(updatedUser)
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong', details: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        await prisma.user.delete({ where: { id: parseInt(id) } })
        res.status(200).send({ message: 'User deleted' })
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong', details: error.message })
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;