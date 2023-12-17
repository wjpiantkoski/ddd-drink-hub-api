import User from "../domain/user.entity"

export default interface IUserRepository {
  create(data: any): Promise<void>
  findByEmail(email: string): Promise<Partial<User>>
  findById(id: string): Promise<Partial<User>>
  updateOne(id: string, data: any): Promise<void>
}