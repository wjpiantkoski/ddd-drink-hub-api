import { Sequelize } from "sequelize-typescript"
import { UserModel } from "../../../../infra/database/sequelize/user/user.model"
import CategoryModel from "../../../../infra/database/sequelize/category/category.model"
import BeverageModel from "../../../../infra/database/sequelize/beverage/beverage.model"
import Category from "../../domain/category/category.entity"
import {v4 as uuidv4} from 'uuid' 
import CreateBeverageUsecaseFactory from "../create-beverage/create-beverage.usecase.factory"
import UpdateBeverageUsecaseFactory from "./update-beverage.usecase.factory"
import BookmarkModel from "../../../../infra/database/sequelize/bookmark/bookmark.model"

describe('UpdateBeverageUsecase', () => {
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
  
  it('should update beverage', async () => {
    const category1 = new Category('Category Name 1')
    const category2 = new Category('Category Name 2')

    await CategoryModel.bulkCreate([
      {
        id: category1.id,
        name: category1.name
      },
      {
        id: category2.id,
        name: category2.name
      },
    ])

    const beverage = {
      id: uuidv4(),
      name: 'beverage',
      userId: uuidv4(),
      categoryId: category1.id,
      description: 'Description'
    }

    await BeverageModel.create(beverage)

    const usecase = UpdateBeverageUsecaseFactory.create()
    
    const beverageData = {
      name: 'Another name',
      description: 'Another description',
      categoryId: category2.id
    }

    await usecase.execute({
      beverageId: beverage.id,
      beverage: beverageData
    })

    const result = await BeverageModel.findOne({
      where: { id: beverage.id }
    })

    expect(result).toBeDefined()
    expect(result.name).toEqual(beverageData.name)
    expect(result.categoryId).toEqual(beverageData.categoryId)
    expect(result.description).toEqual(beverageData.description)
  })

  it('should not update beverage when is not found', async () => {
    const usecase = UpdateBeverageUsecaseFactory.create()

    await expect(usecase.execute({
      beverageId: '123',
      beverage: {
        name: 'Test',
        categoryId: 'category-id',
        description: 'Description'
      }
    })).rejects.toThrow('Beverage not found')
  })

  it('should not update beverage when category is not found', async () => {
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

    const usecase = UpdateBeverageUsecaseFactory.create()
    
    const beverageData = {
      name: 'Another name',
      description: 'Another description',
      categoryId: '123'
    }

    await expect(usecase.execute({
      beverageId: beverage.id,
      beverage: beverageData
    })).rejects.toThrow('Category not found')
  })
})