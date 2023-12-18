import Beverage from "../../../../modules/beverage/domain/beverage/beverage.entity";
import Bookmark from "../../../../modules/beverage/domain/bookmark/bookmark.entity";
import Category from "../../../../modules/beverage/domain/category/category.entity";
import IBookmarkRepository from "../../../../modules/beverage/repository/bookmark.repository.interface";
import BeverageModel from "../beverage/beverage.model";
import CategoryModel from "../category/category.model";
import BookmarkModel from "./bookmark.model";

export default class BookmarkRepository implements IBookmarkRepository {
  async create(bookmark: Bookmark): Promise<void> {
    await BookmarkModel.create({
      id: bookmark.id,
      userId: bookmark.userId,
      beverageId: bookmark.beverage.id
    })
  }

  async findAllByUserId(userId: string): Promise<Bookmark[]> {
    const bookmarks = await BookmarkModel.findAll({
      where: { userId },
      include: [
        {
          model: BeverageModel,
          include: [CategoryModel]
        }
      ]
    })

    return bookmarks.map(bookmark => {
      const category = new Category(bookmark.beverage.category.name, bookmark.beverage.category.id)
      
      const beverage = new Beverage({
        category,
        id: bookmark.beverage.id,
        name: bookmark.beverage.name,
        userId: bookmark.beverage.userId,
        description: bookmark.beverage.description
      })

      return new Bookmark(bookmark.userId, beverage, bookmark.id)
    })
  }

  async deleteById(id: string): Promise<void> {
    await BookmarkModel.destroy({ where: { id } })
  }
  
}