import CreateBeverageUsecase from "./create-beverage.usecase"
import CreateBeverageUsecaseFactory from "./create-beverage.usecase.factory"

describe('CreateBeverageUsecaseFactory', () => {
  it('should create CreateBeverageUsecase', () => {
    const usecase = CreateBeverageUsecaseFactory.create()
    expect(usecase).toBeInstanceOf(CreateBeverageUsecase)
  })
})