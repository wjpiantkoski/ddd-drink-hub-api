import UserLoginUsecase from "./user-login.usecase"
import UserLoginUsecaseFactory from "./user-login.usecase.factory"

describe('UserLoginUsecaseFactory', () => {
  it('should create UserLoginUsecase', () => {
    const usecase = UserLoginUsecaseFactory.create()
    expect(usecase).toBeInstanceOf(UserLoginUsecase)
  })
})