import UserRegisterUsecase from "./user-register.usecase"
import UserRegisterUsecaseFactory from "./user-register.usecase.factory"

describe('UserRegisterUsecaseFactory', () => {
  it('should create UserRegisterUsecase', () => {
    const usecase = UserRegisterUsecaseFactory.create()
    expect(usecase).toBeInstanceOf(UserRegisterUsecase)
  })
})