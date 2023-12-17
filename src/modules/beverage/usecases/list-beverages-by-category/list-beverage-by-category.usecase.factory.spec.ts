import ListBeverageByCategoryUsecase from "./list-beverage-by-category.usecase"
import ListBeverageByCategoryUsecaseFactory from "./list-beverage-by-category.usecase.factory"

describe('ListBeverageByCategoryUsecaseFactory', () => {
  it('should create ListBeverageByCategoryUsecase', () => {
    const usecase = ListBeverageByCategoryUsecaseFactory.create()
    expect(usecase).toBeInstanceOf(ListBeverageByCategoryUsecase)
  })
})