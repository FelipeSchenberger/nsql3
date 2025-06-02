import express from 'express'
import { getHeroes, createHero, getHeroById, updateHero, deleteHero } from '../controllers/hero.controller.js'

const router = express.Router()

router.get('/', getHeroes)
router.post('/', createHero)
router.get('/:id', getHeroById)
router.put('/:id', updateHero)
router.delete('/:id', deleteHero)

export default router
