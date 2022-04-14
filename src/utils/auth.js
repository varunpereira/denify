import db from '@src/utils/db'
import userModel from '@src/models/userModel'
import orderModel from '@src/models/orderModel'
import jwt from 'jsonwebtoken'

db()

export default async function (refreshToken) {
  try {
    if (!refreshToken) {
      return { error: 'Please login now!' }
    }
    let result = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    if (!result) {
      return { error: 'Your token is incorrect or has expired.' }
    }

    let user = await userModel.findOne({ email: result.id })
    if (user === null) {
      return { error: 'User do not exist.' }
    }

    let accessToken = jwt.sign(
      { id: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    )

    let currentOrder = await orderModel.findOne({
      email: user.email,
      current: true,
    })
    if (currentOrder === null) {
      return { error: 'Cart do not exist.' }
    }

    return {
      accessToken: accessToken,
      user: {
        email: user.email,
        role: user.role,
      },
      cartQuantity: currentOrder.quantity,
    }
  } catch (error) {
    return { error: error.message }
  }
}
