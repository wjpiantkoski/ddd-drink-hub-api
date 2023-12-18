import IService from "../../../../@shared/domain/service/service.interface";
import UsecaseResponse from "../../../../@shared/domain/usecase/usecase-response";
import IUsecase from "../../../../@shared/domain/usecase/usecase.interface";
import User from "../../domain/user.entity";
import IUserRepository from "../../repository/user.repository.interface";

export interface UserRegisterUsecaseInput {
  name: string
  email: string
  password: string
}

export interface UserRegisterUsecaseOutput {
  id: string,
  name: string,
  email: string
}

export default class UserRegisterUsecase implements IUsecase {

  constructor(
    private userRepository: IUserRepository,
    private hashUserPassword: IService
  ) {}

  async execute(input: UserRegisterUsecaseInput): Promise<UsecaseResponse> {
    const user = await this.userRepository.findByEmail(input.email)

    if (!!user) {
      return {
        data: null,
        status: 400,
      }
    }

    try {
      const hashedPassword = await this.hashUserPassword.run(input.password)
      const newUser = new User(input.name, input.email, hashedPassword)

      await this.userRepository.create(newUser)

      return {
        status: 201,
        data: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        }
      }
    } catch {
      return {
        data: null,
        status: 422
      }
    }
  }
  
}