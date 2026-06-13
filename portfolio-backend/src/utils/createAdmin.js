import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import Admin from '../models/Admin.js'

dotenv.config()

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL })

    if (existingAdmin) {
      console.log('Admin already exists')
      process.exit()
    }

    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)

    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
    })

    console.log('Admin created successfully:', admin.email)
    process.exit()
  } catch (error) {
    console.error('Error creating admin:', error)
    process.exit(1)
  }
}

createAdmin()