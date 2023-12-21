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
      description: beverage.description,
      image: beverage.image
    })
  }

  async findByCategoryId(categoryId: string): Promise<Beverage[]> {
    const items = await BeverageModel.findAll({
      where: { categoryId },
      include: [CategoryModel]
    })

    return items.map(item => {
      const category = new Category(item.category.name, item.category.id)

      return new Beverage({
        category,
        id: item.id,
        name: item.name,
        userId: item.userId,
        description: item.description,
        image: item.image
      })
    })
  }

  async create(beverage: Beverage): Promise<void> {
    await BeverageModel.create({
      id: beverage.id,
      name: beverage.name,
      userId: beverage.userId,
      categoryId: beverage.category.id,
      description: beverage.description,
      image: beverage.image
    })  
  }

  async update(beverage: Beverage): Promise<void> {
    await BeverageModel.update({
      name: beverage.name,
      categoryId: beverage.category.id,
      description: beverage.description,
      image: beverage.image
    }, {
      where: { id: beverage.id }
    })
  }

  async deleteById(id: string): Promise<void> {
    await BeverageModel.destroy({ where: { id } })
  }
  
}