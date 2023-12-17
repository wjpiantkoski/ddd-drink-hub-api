import Category from "../domain/category/category.entity"

export default interface ICategoryRepository {
  findById(id: string): Promise<Category>
  create(category: Category): Promise<void>
  createMany(categories: Category[]): Promise<void>
  findAll(): Promise<Category[]>
}