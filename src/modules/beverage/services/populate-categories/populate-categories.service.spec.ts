import { Sequelize } from "sequelize-typescript"
import CategoryModel from "../../../../infra/database/sequelize/category/category.model"
import PopulateCategoriesServiceFactory from "./populate-categories.service.factory"
import BeverageModel from "../../../../infra/database/sequelize/beverage/beverage.model"
import BookmarkModel from "../../../../infra/database/sequelize/bookmark/bookmark.model"

describe('PopulateCategoriesService', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false
    })

    await sequelize.addModels([ 
      CategoryModel,
      BeverageModel,
      BookmarkModel
    ])
    
    await sequelize.sync({force: true})
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