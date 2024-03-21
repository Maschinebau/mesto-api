import mongoose, { Schema, Document } from 'mongoose'
import { IUser } from './userModel.js'

export interface ICard extends Document {
  name: string
  link: string
  owner: IUser
  likes: IUser[]
  createdAt: Date
}

const cardSchema: Schema = new Schema<ICard>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  link: {
    type: String,
    validate: {
      validator: (v: string) => /^(http|https):\/\/[^ "]+$/.test(v),
      message: (props: { value: string }) => `${props.value} is not a valid URL!`
    },
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

export const CardModel = mongoose.model<ICard>('card', cardSchema)
