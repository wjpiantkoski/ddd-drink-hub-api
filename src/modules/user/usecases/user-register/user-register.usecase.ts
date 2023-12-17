import IService from "../../../../@shared/domain/service/service.interface";
import IUsecase from "../../../../@shared/domain/usercase/usecase.interface";
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

  async execute(input: UserRegisterUsecaseInput): Promise<UserRegisterUsecaseOutput> {
    const hashedPassword = await this.hashUserPassword.run(input.password)
    const user = new User(input.name, input.email, hashedPassword)

    await this.userRepository.create(new User(input.name, input.email, hashedPassword, user.id))

    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
  
}