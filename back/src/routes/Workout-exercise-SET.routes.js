const { PrismaClient } = require('@prisma/client');
const { Router } = require('express')
const router = Router()


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