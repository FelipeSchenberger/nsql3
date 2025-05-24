import express from 'express'
import { getHeroes, createHero } from '../controllers/hero.controller.js'

const router = express.Router()

router.get('/', getHeroes)
router.post('/', createHero)

export default router
