import IUsecase from "../../../../@shared/domain/usercase/usecase.interface";
import IBeverageRepository from "../../repository/beverage.repository.interface";

export interface RemoveBeverageUsecaseInput {
  beverageId: string
}

export default class RemoveBeverageUsecase implements IUsecase {

  constructor(private beverageRepository: IBeverageRepository) {}

  async execute(input: RemoveBeverageUsecaseInput): Promise<void> {
    await this.beverageRepository.deleteById(input.beverageId)
  }
}