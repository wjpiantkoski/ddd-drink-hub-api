export default interface IUserRepository {
  create(data: any): Promise<void>
  findOne(query: any): Promise<any>
  updateOne(id: string, data: any): Promise<void>
}