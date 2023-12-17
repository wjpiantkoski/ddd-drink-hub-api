import Category from "../../../../modules/beverage/domain/category/category.entity";
import ICategoryRepository from "../../../../modules/beverage/repository/category.repository.interface";
import CategoryModel from "./category.model";

export default class CategoryRepository implements ICategoryRepository {
  async exists(id: string): Promise<boolean> {
    const count = await CategoryModel.count({ where: {id} })
    return count > 0
  }

  async create(category: Category): Promise<void> {
    await CategoryModel.create({
      id: category.id,
      name: category.name
    })
  }

  async createMany(categories: Category[]): Promise<void> {
    const items = categories.map(category => {
      return {
        id: category.id,
        name: category.name
      }
    })

    await CategoryModel.bulkCreate(items)
  }
  findAll(): Promise<Category[]> {
    throw new Error("Method not implemented.");
  }
}