import ShowBeverageUsecase from "./show-beverage.usecase"
import ShowBeverageUsecaseFactory from "./show-beverage.usecase.factory"

describe('ShowBeverateUsecaseFactory', () => {
  it('should create ShowBeverageUsecase', () => {
    const usecase = ShowBeverageUsecaseFactory.create()
    expect(usecase).toBeInstanceOf(ShowBeverageUsecase)
  })
})