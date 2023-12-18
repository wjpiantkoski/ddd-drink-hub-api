import UsecaseResponse from "../../../../@shared/domain/usecase/usecase-response";
import IUsecase from "../../../../@shared/domain/usecase/usecase.interface";
import IBeverageRepository from "../../repository/beverage.repository.interface";

export interface RemoveBeverageUsecaseInput {
  beverageId: string
}

export default class RemoveBeverageUsecase implements IUsecase {

  constructor(private beverageRepository: IBeverageRepository) {}

  async execute(input: RemoveBeverageUsecaseInput): Promise<UsecaseResponse> {
    await this.beverageRepository.deleteById(input.beverageId)
    
    return {
      status: 204,
      data: null
    }
  }
}