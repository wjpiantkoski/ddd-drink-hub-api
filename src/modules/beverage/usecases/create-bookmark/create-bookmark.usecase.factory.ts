import BeverageRepository from "../../../../infra/database/sequelize/beverage/beverage.repository";
import BookmarkRepository from "../../../../infra/database/sequelize/bookmark/bookmark.repository";
import CreateBookmarkUsecase from "./create-bookmark.usecase";

export default class CreateBookmarkUsecaseFactory {
  static create(): CreateBookmarkUsecase {
    return new CreateBookmarkUsecase(
      new BookmarkRepository(),
      new BeverageRepository()
    )
  }
}