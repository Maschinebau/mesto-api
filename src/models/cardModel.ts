import mongoose, { Schema, Document, Types } from 'mongoose'
import { IUser } from './userModel.js'

interface ICard extends Document {
  name: string
  link: string
  owner: IUser
  likes: Types.ObjectId[]
  createdAt: Date
}

const cardSchema: Schema = new Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30
  },
  link: {
    type: String,
    validate: {
      validator: (v: string) => /^(http|https):\/\/[^ "]+$/.test(v),
      message: (props: { value: string }) => `${props.value} is not a valid URL!`
    }
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Card = mongoose.model('card', cardSchema)

export default Card
