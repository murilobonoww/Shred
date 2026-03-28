const { PrismaClient } = require('@prisma/client');
const { Router } = require('express')
const router = Router()

router.put('/rename/:workoutId', async (req, res) => {
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

router.get('/:userID', async (req, res) => {
    const { userID } = req.params

    try {
        const user_workouts = await prisma.workout.findMany({ where: { userId: parseInt(userID) } })
        res.status(200).send(user_workouts)
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong :(', details: error.message })
    }
})

router.post('/:userID', async (req, res) => {
    const { userID } = req.params

    try {
        await prisma.workout.create({ data: { userId: parseInt(userID) } })
        res.status(200).send({ msg: 'Workout created!' })
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong :(', details: error.message })
    }
})


module.exports = router;