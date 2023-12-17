import Beverage from "../../../../modules/beverage/domain/beverage/beverage.entity";
import IBeverageRepository from "../../../../modules/beverage/repository/beverage.repository.interface";
import BeverageModel from "./beverage.model";

export default class BeverageRepository implements IBeverageRepository {
  findById(id: string): Promise<Beverage> {
    throw new Error("Method not implemented.");
  }
  findByCategoryId(categoryId: string): Promise<Beverage[]> {
    throw new Error("Method not implemented.");
  }

  async create(beverage: Beverage): Promise<void> {
    try {
      await BeverageModel.create({
        id: beverage.id,
        name: beverage.name,
        userId: beverage.userId,
        categoryId: beverage.category.id,
        description: beverage.description
      })  
    } catch (err) {
      console.error(err)
    }
  }

  update(beverage: Beverage): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}