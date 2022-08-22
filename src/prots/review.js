import mongoose from 'mongoose'

let schema = new mongoose.Schema(
  {
    productId: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.review ||
  mongoose.model('review', schema, 'review')
