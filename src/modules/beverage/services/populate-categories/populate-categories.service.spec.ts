import { Sequelize } from "sequelize-typescript"
import CategoryModel from "../../../../infra/database/sequelize/category/category.model"
import PopulateCategoriesServiceFactory from "./populate-categories.service.factory"
import setupSequelize from "../../../../tests/helpers/setup-sequelize"

describe('PopulateCategoriesService', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await setupSequelize()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should populate categories', async () => {
    const service = PopulateCategoriesServiceFactory.create()
    await service.run()

    const result = await CategoryModel.count()
    
    expect(result).toBeGreaterThan(0)
  })
})