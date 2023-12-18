import BookmarkRepository from "../../../../infra/database/sequelize/bookmark/bookmark.repository";
import ListUserBookmarksUsecase from "./list-user-bookmarks.usecase";

export default class ListUserBookmarksUsecaseFactory {
  static create(): ListUserBookmarksUsecase {
    return new ListUserBookmarksUsecase(new BookmarkRepository())
  }
}