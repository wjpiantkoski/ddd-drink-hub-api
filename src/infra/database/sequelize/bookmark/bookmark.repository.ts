import Bookmark from "../../../../modules/beverage/domain/bookmark/bookmark.entity";
import IBookmarkRepository from "../../../../modules/beverage/repository/bookmark.repository.interface";
import BookmarkModel from "./bookmark.model";

export default class BookmarkRepository implements IBookmarkRepository {
  async create(bookmark: Bookmark): Promise<void> {
    await BookmarkModel.create({
      id: bookmark.id,
      userId: bookmark.userId,
      beverageId: bookmark.beverage.id
    })
  }

  findAllByUserId(userId: string): Promise<Bookmark[]> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}