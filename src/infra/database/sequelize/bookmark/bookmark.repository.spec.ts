import { Sequelize } from "sequelize-typescript"
import BookmarkModel from "./bookmark.model"
import Category from "../../../../modules/beverage/domain/category/category.entity"
import CategoryRepository from "../category/category.repository"
import BeverageRepository from "../beverage/beverage.repository"
import Beverage from "../../../../modules/beverage/domain/beverage/beverage.entity"
import {v4 as uuidv4} from 'uuid' 
import Bookmark from "../../../../modules/beverage/domain/bookmark/bookmark.entity"
import BookmarkRepository from "./bookmark.repository"
import setupSequelize from "../../../../tests/helpers/setup-sequelize"

describe('BookmarkRepository', () => {
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

    const bookmark = new Bookmark(beverage.userId, beverage)
    const repository = new BookmarkRepository()

    await repository.create(bookmark)

    const result = await BookmarkModel.findOne({
      where: { id: bookmark.id }
    })

    expect(result).toBeDefined()
  })

  it('should get all bookmarks from an user', async () => {
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

    const bookmark = new Bookmark(beverage.userId, beverage)
    const repository = new BookmarkRepository()

    await repository.create(bookmark)

    const result = await repository.findAllByUserId(bookmark.userId)

    expect(result.length).toBeGreaterThan(0)
    expect(result[0].userId).toEqual(bookmark.userId)
  })

  it('should remove bookmark', async () => {
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

    const bookmark = new Bookmark(beverage.userId, beverage)
    const repository = new BookmarkRepository()

    await repository.create(bookmark)
    await repository.deleteById(bookmark.id)

    const result = await BookmarkModel.findOne({
      where: { id: bookmark.id }
    })

    expect(result).toBeNull()
  })
})