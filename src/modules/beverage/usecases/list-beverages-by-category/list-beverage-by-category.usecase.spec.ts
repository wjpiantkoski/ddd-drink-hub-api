import { Sequelize } from "sequelize-typescript"
import CategoryModel from "../../../../infra/database/sequelize/category/category.model"
import BeverageModel from "../../../../infra/database/sequelize/beverage/beverage.model"
import Category from "../../domain/category/category.entity"
import {v4 as uuidv4} from 'uuid' 
import ListBeverageByCategoryUsecaseFactory from "./list-beverage-by-category.usecase.factory"
import setupSequelize from "../../../../tests/helpers/setup-sequelize"

describe('ListBeverageByCategoryUsecase', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await setupSequelize()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should list beverages by category id', async () => {
    const category = new Category('Category Name')

    await CategoryModel.create({
      id: category.id,
      name: category.name
    })

    const beverage = {
      id: uuidv4(),
      name: 'beverage',
      userId: uuidv4(),
      categoryId: category.id,
      description: 'Description'
    }

    await BeverageModel.create(beverage)

    const usecase = ListBeverageByCategoryUsecaseFactory.create()

    const {data} = await usecase.execute(category.id)

    expect(data.length).toBeGreaterThan(0)
  })
})