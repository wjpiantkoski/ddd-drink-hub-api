import Bookmark from "../domain/bookmark/bookmark.entity";

export default interface IBookmarkRepository {
  create(bookmark: Bookmark): Promise<void>
  findAllByUserId(userId: string): Promise<Bookmark[]>
  deleteById(id: string): Promise<void>
}