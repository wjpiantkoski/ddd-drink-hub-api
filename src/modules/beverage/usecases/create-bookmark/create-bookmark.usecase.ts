import UsecaseResponse from "../../../../@shared/domain/usecase/usecase-response";
import IUsecase from "../../../../@shared/domain/usecase/usecase.interface";
import Bookmark from "../../domain/bookmark/bookmark.entity";
import IBeverageRepository from "../../repository/beverage.repository.interface";
import IBookmarkRepository from "../../repository/bookmark.repository.interface";

export interface CreateBookmarkUsecaseInput {
  userId: string
  beverageId: string
}

export default class CreateBookmarkUsecase implements IUsecase {

  constructor(
    private bookmarkRepository: IBookmarkRepository,
    private beverageRepository: IBeverageRepository
  ) {}

  async execute(input: CreateBookmarkUsecaseInput): Promise<UsecaseResponse> {
    const bookmarkExists = await this.bookmarkRepository.exists(input.userId, input.beverageId)

    if (bookmarkExists) {
      return {
        status: 400,
        data: {
          message: 'Bookmark already saved'
        }
      }
    }

    try {
      const beverage = await this.beverageRepository.findById(input.beverageId)

      if (!beverage) {
        return {
          status: 400,
          data: {
            message: 'Invalid beverage'
          }
        }
      }

      const bookmark = new Bookmark(input.userId, beverage)

      await this.bookmarkRepository.create(bookmark)

      return {
        status: 200,
        data: null
      }
    } catch {
      return {
        status: 422,
        data: null
      }
    }
  }
}