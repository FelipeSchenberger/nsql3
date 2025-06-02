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

export const getHeroById = async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) {
      return res.status(404).json({ error: 'Hero not found' });
    }
    res.json(hero);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateHero = async (req, res) => {
  try {
    const updatedHero = await Hero.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHero) {
      return res.status(404).json({ error: 'Hero not found' });
    }
    res.json(updatedHero);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteHero = async (req, res) => {
  try {
    const hero = await Hero.findByIdAndDelete(req.params.id);
    if (!hero) {
      return res.status(404).json({ error: 'Hero not found' });
    }
    res.json({ message: 'Hero deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
