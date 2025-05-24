import Hero from '../models/Hero.js'

export const createHero = async (req, res) => {
  try {
    const newHero = new Hero(req.body)
    const saved = await newHero.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getHeroes = async (req, res) => {
  try {
    const heroes = await Hero.find()
    res.json(heroes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
