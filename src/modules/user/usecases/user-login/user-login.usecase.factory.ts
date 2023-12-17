import UserRepository from "../../../../infra/database/sequelize/user/user.repository";
import CompareUserPasswordService from "../../services/compare-user-password/compare-user-password.service";
import GenerateUserTokenService from "../../services/generate-user-token/generate-user-token.service";
import UserLoginUsecase from "./user-login.usecase";

export default class UserLoginUsecaseFactory {
  static create(): UserLoginUsecase {
    return new UserLoginUsecase(
      new UserRepository(),
      new CompareUserPasswordService(),
      new GenerateUserTokenService()
    )
  }
}