import IUsecase from "../../../../@shared/domain/usercase/usecase.interface";
import IBookmarkRepository from "../../repository/bookmark.repository.interface";

export interface RemoveBookmarkUsecaseInput {
  bookmarkId: string
}

export default class RemoveBookmarkUsecase implements IUsecase {

  constructor(private bookmarkRepository: IBookmarkRepository) {}

  async execute(input: RemoveBookmarkUsecaseInput): Promise<void> {
    await this.bookmarkRepository.deleteById(input.bookmarkId)
  }
}