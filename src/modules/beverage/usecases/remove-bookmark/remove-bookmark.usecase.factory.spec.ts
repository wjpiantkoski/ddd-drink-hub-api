import RemoveBookmarkUsecase from "./remove-bookmark.usecase"
import RemoveBookmarkUsecaseFactory from "./remove-bookmark.usecase.factory"

describe('RemoveBookmarkUsecaseFactory', () => {
  it('should create RemoveBookmarkUsecase', () => {
    const usecase = RemoveBookmarkUsecaseFactory.create()
    expect(usecase).toBeInstanceOf(RemoveBookmarkUsecase)
  })
})