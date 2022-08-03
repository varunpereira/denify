import mongoose from 'mongoose'

let schema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    current: {
      type: Boolean,
    },
    products: {
      type: Array,
      default: [],
    },
    price: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    checkoutSessionId: {
      type: String,
      default: 'nothing',
    },
    refunded: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.order || mongoose.model('order', schema, 'order')
