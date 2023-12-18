import { Sequelize } from "sequelize-typescript"
import setupSequelize from "../../../../tests/helpers/setup-sequelize"
import Category from "../../domain/category/category.entity"
import CategoryModel from "../../../../infra/database/sequelize/category/category.model"
import BeverageModel from "../../../../infra/database/sequelize/beverage/beverage.model"
import{v4 as uuidv4} from 'uuid'
import ShowBeverageUsecaseFactory from "./show-beverage.usecase.factory"

describe('ShowBeverageUsecase', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await setupSequelize()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should get beverage', async () => {
    const category = new Category('Category Name 1')

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

    const usecase = ShowBeverageUsecaseFactory.create()

    const {data} = await usecase.execute({ beverageId: beverage.id })

    expect(data.id).toEqual(beverage.id)
  })

  it('should not get beverage if it doesnt exists', async () => {
    const usecase = ShowBeverageUsecaseFactory.create()
    const {status} = await usecase.execute({ beverageId: '123' })

    expect(status).toEqual(404)
  })
})