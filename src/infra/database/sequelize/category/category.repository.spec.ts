import { Sequelize } from "sequelize-typescript"
import CategoryModel from "./category.model"
import CategoryRepository from "./category.repository"
import Category from "../../../../modules/beverage/domain/category/category.entity"
import setupSequelize from "../../../../tests/helpers/setup-sequelize"

describe('CategoryRepository', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await setupSequelize()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create category', async () => {
    const category = new Category('Name')
    const repository = new CategoryRepository()

    await repository.create(category)

    const result = await CategoryModel.findOne({
      where: { id: category.id }
    })

    expect(result).toBeDefined()
    expect(result.name).toEqual(category.name)
  })

  it('should create many categories', async () => {
    const category1 = new Category('Name 1')
    const category2 = new Category('Name 2')
    const categories = [category1, category2]

    const repository = new CategoryRepository()

    await repository.createMany(categories)

    const result = await CategoryModel.findAll()

    expect(result.length).toEqual(categories.length)
  })

  it('should return get category by id', async () => {
    const category = new Category('Name')

    await CategoryModel.create({
      id: category.id,
      name: category.name
    })

    const repository = new CategoryRepository()
    const result = await repository.findById(category.id)

    expect(result).toBeDefined()
  })

  it('should return null if category doesnt exists', async () => {
    const category = new Category('Name')

    const repository = new CategoryRepository()
    const result = await repository.findById(category.id)

    expect(result).toBeNull()
  })

  it('should return all categories', async () => {
    const category = new Category('Name')

    await CategoryModel.create({
      id: category.id,
      name: category.name
    })

    const repository = new CategoryRepository()
    const result = await repository.findAll()

    expect(result.length).toEqual(1)
  })
})