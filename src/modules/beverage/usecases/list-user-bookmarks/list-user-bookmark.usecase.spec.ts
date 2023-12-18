import { Sequelize } from "sequelize-typescript"
import setupSequelize from "../../../../tests/helpers/setup-sequelize"
import CategoryRepository from "../../../../infra/database/sequelize/category/category.repository"
import Category from "../../domain/category/category.entity"
import BeverageRepository from "../../../../infra/database/sequelize/beverage/beverage.repository"
import Beverage from "../../domain/beverage/beverage.entity"
import CreateBookmarkUsecaseFactory from "../create-bookmark/create-bookmark.usecase.factory"
import {v4 as uuidv4} from 'uuid'
import ListUserBookmarksUsecaseFactory from "./list-user-bookmark.usecase.factory"

describe('ListUserBookmarksUsecase', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await setupSequelize()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should list bookmarks by user id', async () => {
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

    const createBookmarkUsecase = CreateBookmarkUsecaseFactory.create()
    const bookmark = {
      userId: beverage.userId,
      beverageId: beverage.id
    }

    await createBookmarkUsecase.execute(bookmark)

    const usecase = ListUserBookmarksUsecaseFactory.create()
    const {data} = await usecase.execute({ userId: bookmark.userId })

    expect(data.length).toBeGreaterThan(0)
  })
})