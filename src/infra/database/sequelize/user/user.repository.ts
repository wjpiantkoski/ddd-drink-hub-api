import User from "../../../../modules/user/domain/user.entity";
import IUserRepository from "../../../../modules/user/repository/user.repository.interface";
import { UserModel } from "./user.model";


export default class UserRepository implements IUserRepository {
  async create(data: User): Promise<void> {
    try {
      await UserModel.create({
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password
      })
    } catch (err) {
      console.error(err)
    }
  }
  findOne(query: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  updateOne(id: string, data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}