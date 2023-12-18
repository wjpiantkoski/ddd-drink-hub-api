import CreateBookmarkUsecase from "./create-bookmark.usecase"
import CreateBookmarkUsecaseFactory from "./create-bookmark.usecase.factory"

describe('CreateBookmarkUsecaseFactory', () => {
  it('should create CreateBookmarkUsecase', () => {
    const usecase = CreateBookmarkUsecaseFactory.create()
    expect(usecase).toBeInstanceOf(CreateBookmarkUsecase)
  })
})