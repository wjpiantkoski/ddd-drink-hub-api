import IService from "../../../../@shared/domain/service/service.interface";
import UsecaseResponse from "../../../../@shared/domain/usecase/usecase-response";
import IUsecase from "../../../../@shared/domain/usecase/usecase.interface";
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

  async execute(input: UserLoginUsecaseInput): Promise<UsecaseResponse> {
    const user = await this.userRepository.findByEmail(input.email)

    if (!user) {
      return {
        data: null,
        status: 401
      }
    }
    
    const passwordMatch = await this.compareUserPasswordService.run({
      password: input.password,
      hashedPassword: user.password
    })

    if (!passwordMatch.equal) {
      return {
        data: null,
        status: 401
      }
    }

    const token = this.generateUserTokenService.run(user.id)

    return {
      status: 200,
      data: token
    }
  }
  
}