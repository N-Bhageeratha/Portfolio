import express from 'express'
import { sendMessage, getMessages, deleteMessage } from '../controllers/messageController.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', sendMessage)

router.get('/', protectAdmin, getMessages)

router.delete('/:id', protectAdmin, deleteMessage)

export default router