import Category from "../domain/category/category.entity"

export default interface ICategoryRepository {
  exists(id: string): Promise<boolean>
  create(category: Category): Promise<void>
  createMany(categories: Category[]): Promise<void>
  findAll(): Promise<Category[]>
}