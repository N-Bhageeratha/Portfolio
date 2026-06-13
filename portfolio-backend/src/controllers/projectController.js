import Project from '../models/Project.js'

const makeSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects', error: error.message })
  }
}

export const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug })
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }
    res.status(200).json(project)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch project', error: error.message })
  }
}

export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      fullDescription = '',
      tech = [],
      image = '',
      screenshots = [],
      features = [],
      github = '',
      live = '',
      featured = false,
      status = 'completed',
    } = req.body

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' })
    }

    let slug = makeSlug(title)
    const existing = await Project.findOne({ slug })
    if (existing) {
      slug = `${slug}-${Date.now()}`
    }

    const project = await Project.create({
      title,
      slug,
      description,
      fullDescription,
      tech,
      image,
      screenshots,
      features,
      github,
      live,
      featured,
      status,
    })

    res.status(201).json(project)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create project', error: error.message })
  }
}

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    const {
      title,
      description,
      fullDescription,
      tech,
      image,
      screenshots,
      features,
      github,
      live,
      featured,
      status,
    } = req.body

    if (title && title !== project.title) {
      let newSlug = makeSlug(title)
      const existing = await Project.findOne({
        slug: newSlug,
        _id: { $ne: project._id },
      })

      if (existing) {
        newSlug = `${newSlug}-${Date.now()}`
      }

      project.slug = newSlug
      project.title = title
    }

    if (description !== undefined) project.description = description
    if (fullDescription !== undefined) project.fullDescription = fullDescription
    if (tech !== undefined) project.tech = tech
    if (image !== undefined) project.image = image
    if (screenshots !== undefined) project.screenshots = screenshots
    if (features !== undefined) project.features = features
    if (github !== undefined) project.github = github
    if (live !== undefined) project.live = live
    if (featured !== undefined) project.featured = featured
    if (status !== undefined) project.status = status

    const updated = await project.save()
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ message: 'Failed to update project', error: error.message })
  }
}

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)

    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }

    await project.deleteOne()
    res.status(200).json({ message: 'Project deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete project', error: error.message })
  }
}