import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  about: string
  avatar: string
  _id?: string
}

const userSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => /^(http|https):\/\/[^ "]+$/.test(v),
      message: (props: { value: string }) => `${props.value} is not a valid URL!`,
    },
  },
})

export const UserModel = mongoose.model<IUser>('user', userSchema)
