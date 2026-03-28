const { PrismaClient } = require('@prisma/client');
const { Router } = require('express')
const router = Router()

router.get('/getAll', async (req, res) => {
    try {
        const exercises = await prisma.exercise.findMany()
        res.status(200).send(exercises)
    } catch (error) {
        res.status(500).send({ error: 'Operation failed :(', details: error.message })
    }
})

router.post('/', async (req, res) => {
    const { name } = req.body

    try {
        await prisma.exercise.create({ data: { name } })
        res.status(201).send({ msg: 'Exercise created!' })
    } catch (error) {
        res.status(500).send({ error: 'Operation failed :(', details: error.message })
    }
})


module.exports = router;