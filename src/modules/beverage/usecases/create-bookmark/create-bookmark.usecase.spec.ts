import { Sequelize } from "sequelize-typescript"
import setupSequelize from "../../../../tests/helpers/setup-sequelize"
import CategoryRepository from "../../../../infra/database/sequelize/category/category.repository"
import Category from "../../domain/category/category.entity"
import BeverageRepository from "../../../../infra/database/sequelize/beverage/beverage.repository"
import Beverage from "../../domain/beverage/beverage.entity"
import {v4 as uuidv4} from 'uuid'
import CreateBookmarkUsecaseFactory from "./create-bookmark.usecase.factory"
import BookmarkModel from "../../../../infra/database/sequelize/bookmark/bookmark.model"

describe('CreateBookmarkUsecase', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await setupSequelize()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create bookmark', async () => {
    const categoryRepository = new CategoryRepository()
    const category = new Category('Category Name')

    await categoryRepository.create(category)

    const beverageRepository = new BeverageRepository()
    const beverage = new Beverage({
      category,
      name: 'Beverage',
      userId: uuidv4(),
      description: 'Description'
    })

    await beverageRepository.create(beverage)

    const usecase = CreateBookmarkUsecaseFactory.create()
    const bookmark = {
      userId: beverage.userId,
      beverageId: beverage.id
    }

    await usecase.execute(bookmark)

    const result = await BookmarkModel.findOne({where: bookmark})

    expect(result).toBeDefined()
  })

  it('should not duplicate bookmark', async () => {
    const categoryRepository = new CategoryRepository()
    const category = new Category('Category Name')

    await categoryRepository.create(category)

    const beverageRepository = new BeverageRepository()
    const beverage = new Beverage({
      category,
      name: 'Beverage',
      userId: uuidv4(),
      description: 'Description'
    })

    await beverageRepository.create(beverage)

    const usecase = CreateBookmarkUsecaseFactory.create()
    const bookmark = {
      userId: beverage.userId,
      beverageId: beverage.id
    }

    await usecase.execute(bookmark)
    await usecase.execute(bookmark)

    const result = await BookmarkModel.count({where: bookmark})

    expect(result).toEqual(1)
  })

  it('should throw error when beverage doesnt exist', async () => {
    const beverage = new Beverage({
      name: 'Beverage',
      userId: uuidv4(),
      description: 'Description',
      category: new Category('Category Name')
    })

    const usecase = CreateBookmarkUsecaseFactory.create()

    const bookmark = {
      userId: beverage.userId,
      beverageId: beverage.id
    }

    const {status} = await usecase.execute(bookmark)

    expect(status).toEqual(400)
  })
})