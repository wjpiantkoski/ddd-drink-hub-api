import IUsecase from "../../../../@shared/domain/usecase/usecase.interface";
import Bookmark from "../../domain/bookmark/bookmark.entity";
import IBookmarkRepository from "../../repository/bookmark.repository.interface";

export interface ListUserBookmarksUsecaseInput {
  userId: string
}

export default class ListUserBookmarksUsecase implements IUsecase {

  constructor(private bookmarkRepository: IBookmarkRepository) {}

  execute(input: ListUserBookmarksUsecaseInput): Promise<Bookmark[]> {
    return this.bookmarkRepository.findAllByUserId(input.userId)
  }
}