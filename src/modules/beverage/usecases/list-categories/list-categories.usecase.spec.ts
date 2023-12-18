import { Sequelize } from "sequelize-typescript"
import CategoryModel from "../../../../infra/database/sequelize/category/category.model"
import ListCategoriesUsecaseFactory from "./list-categories.usecase.factory"
import setupSequelize from "../../../../tests/helpers/setup-sequelize"

describe('ListCategoriesUsecase', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await setupSequelize()
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
    const {data} = await usecase.execute()

    expect(data.length).toBeGreaterThan(0)
  })
})