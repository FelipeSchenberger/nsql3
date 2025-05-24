import Hero from '../models/Hero.js'

export const getHeroes = async (req, res) => {
  const heroes = await Hero.find()
  res.json(heroes)
}

export const createHero = async (req, res) => {
  const newHero = new Hero(req.body)
  await newHero.save()
  res.status(201).json(newHero)
}
