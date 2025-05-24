import mongoose from 'mongoose'

const heroSchema = new mongoose.Schema({
  character: String,
  name: String,
  universe: String,
  year: String,
  description: String,
  equipment: String,
  images: String 
})

export default mongoose.model('Hero', heroSchema)
