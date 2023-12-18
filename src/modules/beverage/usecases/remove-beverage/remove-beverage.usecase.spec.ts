import { Sequelize } from "sequelize-typescript"
import { UserModel } from "../../../../infra/database/sequelize/user/user.model"
import CategoryModel from "../../../../infra/database/sequelize/category/category.model"
import BeverageModel from "../../../../infra/database/sequelize/beverage/beverage.model"
import Category from "../../domain/category/category.entity"
import {v4 as uuidv4} from 'uuid'
import RemoveBeverageUsecaseFactory from "./remove-beverage.usecase.factory"

describe('RemoveBeverageUsecaase', () => {
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
      BeverageModel
    ])

    await sequelize.sync({force: true})
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should remove beverage', async () => {
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

    const usecase = RemoveBeverageUsecaseFactory.create()
    await usecase.execute({ beverageId: beverage.id })

    const result = await BeverageModel.findOne({
      where: { id: beverage.id }
    })

    expect(result).toBeNull()
  })
})