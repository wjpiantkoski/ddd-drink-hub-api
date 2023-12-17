import { Sequelize } from "sequelize-typescript"
import CategoryModel from "../../../../infra/database/sequelize/category/category.model"
import ListCategoriesUsecaseFactory from "./list-categories.usecase.factory"
import BeverageModel from "../../../../infra/database/sequelize/beverage/beverage.model"

describe('ListCategoriesUsecase', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false
    })

    await sequelize.addModels([ 
      CategoryModel,
      BeverageModel
    ])

    await sequelize.sync({force: true})
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should list categories', async () => {
    await CategoryModel.create({
      id: '123',
      name: 'Name'
    })

    const usecase = ListCategoriesUsecaseFactory.create()
    const results = await usecase.execute()

    expect(results.length).toBeGreaterThan(0)
  })
})