import IService from "../../../../@shared/domain/service/service.interface";
import UsecaseResponse from "../../../../@shared/domain/usecase/usecase-response";
import IUsecase from "../../../../@shared/domain/usecase/usecase.interface";
import IBeverageRepository from "../../repository/beverage.repository.interface";

export interface RemoveBeverageUsecaseInput {
  beverageId: string
}

export default class RemoveBeverageUsecase implements IUsecase {

  constructor(
    private beverageRepository: IBeverageRepository,
    private removeBeverageImage: IService
  ) {}

  async execute(input: RemoveBeverageUsecaseInput): Promise<UsecaseResponse> {
    const beverage = await this.beverageRepository.findById(input.beverageId)

    if (beverage) {
      await Promise.all([
        this.removeBeverageImage.run(beverage.image),
        this.beverageRepository.deleteById(input.beverageId)
      ])
    }
    
    return {
      status: 204,
      data: null
    }
  }
}