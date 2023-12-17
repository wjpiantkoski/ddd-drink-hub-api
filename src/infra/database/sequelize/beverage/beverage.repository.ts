import Beverage from "../../../../modules/beverage/domain/beverage/beverage.entity";
import Category from "../../../../modules/beverage/domain/category/category.entity";
import IBeverageRepository from "../../../../modules/beverage/repository/beverage.repository.interface";
import CategoryModel from "../category/category.model";
import BeverageModel from "./beverage.model";

export default class BeverageRepository implements IBeverageRepository {
  async findById(id: string): Promise<Beverage> {
    const beverage = await BeverageModel.findOne({ 
      where: { id },
      include: [CategoryModel]
    })

    if (!beverage) {
      return null
    }

    const category = new Category(beverage.category.name, beverage.category.id)

    return new Beverage({
      category,
      id: beverage.id,
      name: beverage.name,
      userId: beverage.userId,
      description: beverage.description
    })
  }

  findByCategoryId(categoryId: string): Promise<Beverage[]> {
    throw new Error("Method not implemented.");
  }

  async create(beverage: Beverage): Promise<void> {
    await BeverageModel.create({
      id: beverage.id,
      name: beverage.name,
      userId: beverage.userId,
      categoryId: beverage.category.id,
      description: beverage.description
    })  
  }

  update(beverage: Beverage): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}