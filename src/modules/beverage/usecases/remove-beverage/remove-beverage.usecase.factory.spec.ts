import RemoveBeverageUsecase from "./remove-beverage.usecase"
import RemoveBeverageUsecaseFactory from "./remove-beverage.usecase.factory"

describe('RemoveBeverageUsecaseFactory', () => {
  it('should create RemoveBeverageUsecase', () => {
    const usecase = RemoveBeverageUsecaseFactory.create()
    expect(usecase).toBeInstanceOf(RemoveBeverageUsecase)
  })
})