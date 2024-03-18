import { BaseController } from './baseController.js'
import { UserModel, IUser } from '../models/userModel.js'

export class UserController extends BaseController<IUser> {
  constructor() {
    super(UserModel)
  }
}

export default new UserController()
