import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'

export const protectAdmin = async (req, res, next) => {
  try {
    let token = null

    if (req.cookies?.adminToken) {
      token = req.cookies.adminToken
    } else if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const admin = await Admin.findById(decoded.id).select('-password')

    if (!admin) {
      return res.status(401).json({ message: 'Not authorized, admin not found' })
    }

    req.admin = admin
    next()
  } catch (error) {
    res.status(401).json({ message: 'Not authorized', error: error.message })
  }
}