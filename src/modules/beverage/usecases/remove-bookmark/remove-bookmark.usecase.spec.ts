import { Sequelize } from "sequelize-typescript"
import setupSequelize from "../../../../tests/helpers/setup-sequelize"
import CategoryRepository from "../../../../infra/database/sequelize/category/category.repository"
import Category from "../../domain/category/category.entity"
import BeverageRepository from "../../../../infra/database/sequelize/beverage/beverage.repository"
import Beverage from "../../domain/beverage/beverage.entity"
import {v4 as uuidv4} from 'uuid'
import RemoveBookmarkUsecaseFactory from "./remove-bookmark.usecase.factory"
import BookmarkRepository from "../../../../infra/database/sequelize/bookmark/bookmark.repository"
import Bookmark from "../../domain/bookmark/bookmark.entity"
import BookmarkModel from "../../../../infra/database/sequelize/bookmark/bookmark.model"

describe('RemoveBookmarkUsecase', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = await setupSequelize()
  })

  afterEach(async () => {
    await sequelize.close()
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
      description: 'Description',
      image: `${uuidv4()}.png`
    })

    await beverageRepository.create(beverage)

    const bookmarkRepository = new BookmarkRepository()
    const bookmark = new Bookmark(beverage.userId, beverage)

    await bookmarkRepository.create(bookmark)

    const usecase = RemoveBookmarkUsecaseFactory.create()
    await usecase.execute({ bookmarkId: bookmark.id })

    const result = await BookmarkModel.findOne({
      where: { id: bookmark.id }
    })

    expect(result).toBeNull()
  })
})