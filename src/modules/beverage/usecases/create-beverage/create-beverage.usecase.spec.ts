import { Sequelize } from "sequelize-typescript"
import CategoryModel from "../../../../infra/database/sequelize/category/category.model"
import BeverageModel from "../../../../infra/database/sequelize/beverage/beverage.model"
import Category from "../../domain/category/category.entity"
import {v4 as uuidv4} from 'uuid' 
import CreateBeverageUsecaseFactory from "./create-beverage.usecase.factory"
import setupSequelize from "../../../../tests/helpers/setup-sequelize"

describe('CreateBeverageUsecase', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await setupSequelize()
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
      description: 'Description',
      image: `${uuidv4()}.png`
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
      description: 'Description',
      image: `${uuidv4()}.png`
    }

    const usecase = CreateBeverageUsecaseFactory.create()
    const {status} = await usecase.execute(beverage)

    expect(status).toEqual(400)
  })
})