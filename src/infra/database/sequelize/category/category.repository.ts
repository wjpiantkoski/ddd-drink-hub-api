import Category from "../../../../modules/beverage/domain/category/category.entity";
import ICategoryRepository from "../../../../modules/beverage/repository/category.repository.interface";
import CategoryModel from "./category.model";

export default class CategoryRepository implements ICategoryRepository {
  exists(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async create(category: Category): Promise<void> {
    await CategoryModel.create({
      id: category.id,
      name: category.name
    })
  }

  createMany(categories: Category[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Category[]> {
    throw new Error("Method not implemented.");
  }
}