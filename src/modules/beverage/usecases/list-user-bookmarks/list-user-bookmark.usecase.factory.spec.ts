import ListUserBookmarksUsecase from "./list-user-bookmarks.usecase"
import ListUserBookmarksUsecaseFactory from "./list-user-bookmark.usecase.factory"

describe('ListUserBookmarksUsecaseFactory', () => {
  it('should create ListUserBookmarksUsecase', () => {
    const usecase = ListUserBookmarksUsecaseFactory.create()
    expect(usecase).toBeInstanceOf(ListUserBookmarksUsecase)
  })
})