import Skill from '../models/Skill.js'

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 })
    res.status(200).json(skills)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch skills' })
  }
}

export const createSkill = async (req, res) => {
  try {
    const { name, category, level, featured } = req.body

    const skill = new Skill({
      name,
      category,
      level,
      featured,
    })

    await skill.save()

    res.status(201).json(skill)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create skill' })
  }
}

export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params

    const updatedSkill = await Skill.findByIdAndUpdate(id, req.body, {
      new: true,
    })

    res.status(200).json(updatedSkill)
  } catch (error) {
    res.status(500).json({ message: 'Failed to update skill' })
  }
}

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params

    await Skill.findByIdAndDelete(id)

    res.status(200).json({ message: 'Skill deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete skill' })
  }
}