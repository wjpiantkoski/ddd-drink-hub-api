import ListCategoriesUsecase from "./list-categories.usecase"
import ListCategoriesUsecaseFactory from "./list-categories.usecase.factory"

describe('ListCategoriesUsecaseFactory', () => {
  it('should create ListCategoriesUsecase', () =>{
    const usecase = ListCategoriesUsecaseFactory.create()
    expect(usecase).toBeInstanceOf(ListCategoriesUsecase)
  })
})