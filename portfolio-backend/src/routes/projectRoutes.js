import express from 'express'
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

// public
router.get('/', getProjects)
router.get('/slug/:slug', getProjectBySlug)

// admin protected
router.post('/', protectAdmin, createProject)
router.put('/:id', protectAdmin, updateProject)
router.delete('/:id', protectAdmin, deleteProject)

export default router