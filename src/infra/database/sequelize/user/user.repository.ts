import User from "../../../../modules/user/domain/user.entity";
import IUserRepository from "../../../../modules/user/repository/user.repository.interface";
import { UserModel } from "./user.model";

export default class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User> {
    const user = await UserModel.findOne({ where: { email } })

    if (!user) {
      return null
    }

    return new User(user.name, user.email, user.password, user.id)
  }
  
  findById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async create(data: User): Promise<void> {
    await UserModel.create({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password
    })
  }

  updateOne(id: string, data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}