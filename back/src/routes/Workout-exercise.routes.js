const { PrismaClient } = require('@prisma/client');
const { Router } = require('express')
const router = Router()

router.post('/:exerciseId/:workoutId', async (req, res) => {
  const { workoutId, exerciseId } = req.params

  try {
    const exercise = await prisma.exercise.findUnique({ where: {id: Number(exerciseId)} })

    const newWorkoutExercise = await prisma.workoutExercise.create({
      data: {
        workoutId: Number(workoutId),
        exerciseId: Number(exerciseId),
        exerciseName: exercise.name,
        order: 0
      }
    })

    res.status(201).send(newWorkoutExercise)
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong', details: error.message })
  }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        await prisma.workoutExercise.delete({ where: { id: parseInt(id) } })
        res.status(200).send({ msg: 'Workout exercise deleted sucessfully!' })
    } catch (error) {
        res.status(500).send({ error: 'Operation failed :(', details: error.message })
    }
})

module.exports = router;