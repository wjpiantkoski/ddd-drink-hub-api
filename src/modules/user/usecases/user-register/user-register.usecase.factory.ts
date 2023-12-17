import UserRepository from "../../../../infra/database/sequelize/user/user.repository";
import HashUserPasswordService from "../../services/hash-user-password/hash-user-password.service";
import UserRegisterUsecase from "./user-register.usecase";

export default class UserRegisterUsecaseFactory {
  static create(): UserRegisterUsecase {
    return new UserRegisterUsecase(
      new UserRepository(),
      new HashUserPasswordService()
    )
  }
}