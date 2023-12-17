import IUserRepository from "../../../../modules/user/repository/user.repository.interface";
import { UserModel } from "./user.model";


export default class UserRepository implements IUserRepository {
  async create(data: any): Promise<void> {
    await UserModel.create(data)
  }
  findOne(query: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  updateOne(id: string, data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}