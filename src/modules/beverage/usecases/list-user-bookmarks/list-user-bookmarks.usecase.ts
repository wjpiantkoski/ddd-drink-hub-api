import UsecaseResponse from "../../../../@shared/domain/usecase/usecase-response";
import IUsecase from "../../../../@shared/domain/usecase/usecase.interface";
import IBookmarkRepository from "../../repository/bookmark.repository.interface";

export interface ListUserBookmarksUsecaseInput {
  userId: string
}

export default class ListUserBookmarksUsecase implements IUsecase {

  constructor(private bookmarkRepository: IBookmarkRepository) {}

  async execute(input: ListUserBookmarksUsecaseInput): Promise<UsecaseResponse> {
    const items = await this.bookmarkRepository.findAllByUserId(input.userId)

    const bookmarks = items.map(item => {
      return {
        id: item.id,
        beverage: {
          id: item.beverage.id,
          name: item.beverage.name,
          category: item.beverage.category.name,
          image: item.beverage.image
        }
      }
    })

    return {
      status: 200,
      data: bookmarks
    }
  }
}