import UpdateBeverageUsecase from "./update-beverage.usecase"
import UpdateBeverageUsecaseFactory from "./update-beverage.usecase.factory"

describe('UpdateBeverageUsecaseFactory', () => {
  it('should create UpdateBeverageUsecase', () => {
    const usecase = UpdateBeverageUsecaseFactory.create()
    expect(usecase).toBeInstanceOf(UpdateBeverageUsecase)
  })
})