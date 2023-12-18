import UsecaseResponse from "../../../../@shared/domain/usecase/usecase-response";
import IUsecase from "../../../../@shared/domain/usecase/usecase.interface";
import IBookmarkRepository from "../../repository/bookmark.repository.interface";

export interface RemoveBookmarkUsecaseInput {
  bookmarkId: string
}

export default class RemoveBookmarkUsecase implements IUsecase {

  constructor(private bookmarkRepository: IBookmarkRepository) {}

  async execute(input: RemoveBookmarkUsecaseInput): Promise<UsecaseResponse> {
    await this.bookmarkRepository.deleteById(input.bookmarkId)
    
    return {
      status: 204,
      data: null
    }
  }
}