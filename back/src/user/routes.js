const { PrismaClient } = require('@prisma/client');
const { Router } = require('express');
const router = Router();

const prisma = new PrismaClient()

router.post('/workout/:workoutId/exercise', async (req, res) => {
    const { workoutId } = req.params
    const { exerciseId, weight, reps, order, rir, restTime } = req.body

    if (!exerciseId || !weight || !reps || !order) {
        return res.status(400).send({ error: 'Missing required fields' })
    }

    try {
        const newExercise = await prisma.workoutExercise.create({
            data: {
                workoutId: parseInt(workoutId),
                exerciseId,
                weight,
                reps,
                order,
                rir,
                restTime
            }
        })
        res.status(201).send(newExercise)
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong', details: error.message })
    }
})

// Update workout name
router.put('/workoutName/:workoutId', async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    try {
        const updated = await prisma.workout.update({
            where: { id: parseInt(id) },
            data: { name }
        })
        res.status(200).send(updated)
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong', details: error.message })
    }
})

// Update a specific exercise inside a workout
router.put('/workout-exercise/:id', async (req, res) => {
    const { id } = req.params
    const { weight, reps, rir, failed, restTime, order } = req.body

    try {
        const updated = await prisma.workoutExercise.update({
            where: { id: parseInt(id) },
            data: { weight, reps, rir, failed, restTime, order }
        })
        res.status(200).send(updated)
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong', details: error.message })
    }
})

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