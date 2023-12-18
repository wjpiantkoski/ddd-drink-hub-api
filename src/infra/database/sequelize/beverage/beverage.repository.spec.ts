import { Sequelize } from "sequelize-typescript"
import CategoryModel from "../category/category.model"
import BeverageModel from "./beverage.model"
import { UserModel } from "../user/user.model"
import {v4 as uuidv4} from 'uuid' 
import Category from "../../../../modules/beverage/domain/category/category.entity"
import Beverage from "../../../../modules/beverage/domain/beverage/beverage.entity"
import BeverageRepository from "./beverage.repository"
import BookmarkModel from "../bookmark/bookmark.model"

describe('BeverageRepository', () => {
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

    const beverage = new Beverage({
      category,
      name: 'Name',
      userId: uuidv4(),
      description: 'Testing'
    })

    const repository = new BeverageRepository()

    await repository.create(beverage)

    const result = await BeverageModel.findOne({
      where: { id: beverage.id }
    })

    expect(result).toBeDefined()
    expect(result.id).toEqual(beverage.id)
  })

  it('should get beverage by id', async () => {
    const category = new Category('Category Name')

    await CategoryModel.create({
      id: category.id,
      name: category.name
    })

    const beverageId = uuidv4()

    await BeverageModel.create({
      name: 'Name',
      id: beverageId,
      userId: uuidv4(),
      categoryId: category.id,
      description: 'Description'
    })

    const repository = new BeverageRepository()

    const result = await repository.findById(beverageId)

    expect(result).toBeDefined()
    expect(result.id).toEqual(beverageId)
  })

  it('should return null when beverage is not found', async () => {
    const repository = new BeverageRepository()
    const result = await repository.findById('123')

    expect(result).toBeNull()
  })

  it('should list beverages by category id', async () => {
    const category = new Category('Category Name')

    await CategoryModel.create({
      id: category.id,
      name: category.name
    })

    const beverageId = uuidv4()

    await BeverageModel.create({
      name: 'Name',
      id: beverageId,
      userId: uuidv4(),
      categoryId: category.id,
      description: 'Description'
    })

    const repository = new BeverageRepository()
    const results = await repository.findByCategoryId(category.id)

    expect(results.length).toBeGreaterThan(0)
    expect(results[0].category.id).toEqual(category.id)
  })

  it('should update beverage', async () => {
    const category = new Category('Category Name')

    await CategoryModel.create({
      id: category.id,
      name: category.name
    })

    const beverage = new Beverage({
      category,
      name: 'Name',
      userId: uuidv4(),
      description: 'Testing'
    })

    const repository = new BeverageRepository()

    await repository.create(beverage)
    
    beverage.name = 'Another test'
    beverage.description = 'Another description'

    await repository.update(beverage)

    const result = await BeverageModel.findOne({
      where: { id: beverage.id }
    })

    expect(result).toBeDefined()
    expect(result.name).toEqual(beverage.name)
    expect(result.description).toEqual(beverage.description)
  })

  it('should delete beverage', async () => {
    const category = new Category('Category Name')

    await CategoryModel.create({
      id: category.id,
      name: category.name
    })

    const beverageId = uuidv4()

    await BeverageModel.create({
      name: 'Name',
      id: beverageId,
      userId: uuidv4(),
      categoryId: category.id,
      description: 'Description'
    })

    const repository = new BeverageRepository()

    await repository.deleteById(beverageId)

    const result = await BeverageModel.findOne({
      where: { id: beverageId }
    })

    expect(result).toBeNull()
  })
})