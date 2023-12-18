import IUsecase from "../../../../@shared/domain/usercase/usecase.interface";
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

  async execute(input: CreateBookmarkUsecaseInput): Promise<void> {
    const bookmarkExists = await this.bookmarkRepository.exists(input.userId, input.beverageId)

    if (bookmarkExists) {
      return
    }

    const beverage = await this.beverageRepository.findById(input.beverageId)

    if (!beverage) {
      throw new Error('Beverage not found')
    }

    const bookmark = new Bookmark(input.userId, beverage)

    await this.bookmarkRepository.create(bookmark)
  }
}