import express from 'express'
import { loginAdmin, logoutAdmin, getAdminProfile } from '../controllers/authController.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', loginAdmin)
router.post('/logout', logoutAdmin)
router.get('/me', protectAdmin, getAdminProfile)

export default router