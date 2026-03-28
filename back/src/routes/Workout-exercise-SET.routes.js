const { PrismaClient } = require('@prisma/client');
const { Router } = require('express')
const router = Router()

router.post('/:workoutExerciseId', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

module.exports = router;