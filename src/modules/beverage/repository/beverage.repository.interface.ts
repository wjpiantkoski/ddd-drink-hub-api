import Beverage from "../domain/beverage/beverage.entity";

export default interface IBeverageRepository {
  findById(id: string): Promise<Beverage>
  findByCategoryId(categoryId: string): Promise<Beverage[]>
  create(beverage: Beverage): Promise<void>
  update(beverage: Beverage): Promise<void>
  deleteById(id: string): Promise<void>
}