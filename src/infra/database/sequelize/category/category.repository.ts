import Category from "../../../../modules/beverage/domain/category/category.entity";
import ICategoryRepository from "../../../../modules/beverage/repository/category.repository.interface";
import CategoryModel from "./category.model";

export default class CategoryRepository implements ICategoryRepository {
  async findById(id: string): Promise<Category> {
    const category = await CategoryModel.findOne({ where: { id } })

    if (!category) {
      return null
    }

    return new Category(category.name, category.id)
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

  async findAll(): Promise<Category[]> {
    const results = await CategoryModel.findAll()

    return results.map(item => {
      return new Category(item.name, item.id)
    })
  }
}