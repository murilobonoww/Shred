const { PrismaClient } = require('@prisma/client');
const { Router } = require('express')
const router = Router()

router.put('/rename/:id', async (req, res) => {
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

router.get('/', async (req, res) => {
    const { userId } = req.query

    try {
        const user_workouts = await prisma.workout.findMany({ where: { userId: parseInt(userId) } })
        res.status(200).send(user_workouts)
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong :(', details: error.message })
    }
})

router.post('/', async (req, res) => {
    const { userId } = req.query

    try {
        await prisma.workout.create({ data: { userId: parseInt(userId) } })
        res.status(200).send({ msg: 'Workout created!' })
    } catch (error) {
        res.status(500).send({ error: 'Something went wrong :(', details: error.message })
    }
})

module.exports = router;