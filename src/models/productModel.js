import mongoose from 'mongoose'

let schema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    category: {
      type: String,
    },
    stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.product ||
  mongoose.model('product', schema, 'product')
