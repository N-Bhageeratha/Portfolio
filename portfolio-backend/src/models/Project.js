import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    fullDescription: {
      type: String,
      default: '',
      trim: true,
    },
    tech: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: '',
    },
    screenshots: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    github: {
      type: String,
      default: '',
    },
    live: {
      type: String,
      default: '',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress'],
      default: 'completed',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Project', projectSchema)