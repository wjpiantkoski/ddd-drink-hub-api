import IService from "../../../../@shared/domain/service/service.interface";
import IUsecase from "../../../../@shared/domain/usercase/usecase.interface";
import IUserRepository from "../../repository/user.repository.interface";

export interface UserLoginUsecaseInput {
  email: string
  password: string
}

export interface UserLoginUsecaseOutput {
  token: string
}

export default class UserLoginUsecase implements IUsecase {

  constructor(
    private userRepository: IUserRepository,
    private compareUserPasswordService: IService,
    private generateUserTokenService: IService
  ) {}

  async execute(input: UserLoginUsecaseInput): Promise<UserLoginUsecaseOutput> {
    const user = await this.userRepository.findByEmail(input.email)

    if (!user) {
      throw new Error('Invalid credentials')
    }
    
    const passwordMatch = await this.compareUserPasswordService.run({
      password: input.password,
      hashedPassword: user.password
    })

    if (!passwordMatch.equal) {
      throw new Error('Invalid credentials')
    }

    return this.generateUserTokenService.run(user.id)
  }
  
}