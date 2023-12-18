import { Sequelize } from "sequelize-typescript"
import { UserModel } from "../../../../infra/database/sequelize/user/user.model"
import CategoryModel from "../../../../infra/database/sequelize/category/category.model"
import BeverageModel from "../../../../infra/database/sequelize/beverage/beverage.model"
import Category from "../../domain/category/category.entity"
import {v4 as uuidv4} from 'uuid' 
import CreateBeverageUsecaseFactory from "./create-beverage.usecase.factory"
import BookmarkModel from "../../../../infra/database/sequelize/bookmark/bookmark.model"

describe('CreateBeverageUsecase', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false
    })

    await sequelize.addModels([ 
      UserModel,
      CategoryModel,
      BeverageModel,
      BookmarkModel
    ])

    await sequelize.sync({force: true})
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create beverage', async () => {
    const category = new Category('Category Name')

    await CategoryModel.create({
      id: category.id,
      name: category.name
    })

    const beverage = {
      name: 'beverage',
      userId: uuidv4(),
      categoryId: category.id,
      description: 'Description'
    }

    const usecase = CreateBeverageUsecaseFactory.create()

    await usecase.execute(beverage)

    const result = await BeverageModel.findOne({ where: beverage })

    expect(result).toBeDefined()
  })

  it('should not create beverage with invalid category', async () => {
    const category = new Category('Category Name')

    const beverage = {
      name: 'beverage',
      userId: uuidv4(),
      categoryId: category.id,
      description: 'Description'
    }

    const usecase = CreateBeverageUsecaseFactory.create()

    await expect(usecase.execute(beverage)).rejects.toThrow('Category not found')
  })
})