import BookmarkRepository from "../../../../infra/database/sequelize/bookmark/bookmark.repository";
import RemoveBookmarkUsecase from "./remove-bookmark.usecase";

export default class RemoveBookmarkUsecaseFactory {
  static create(): RemoveBookmarkUsecase {
    return new RemoveBookmarkUsecase(new BookmarkRepository())
  }
}