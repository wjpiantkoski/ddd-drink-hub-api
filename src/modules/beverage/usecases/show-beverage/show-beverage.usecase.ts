import UsecaseResponse from "../../../../@shared/domain/usecase/usecase-response";
import IUsecase from "../../../../@shared/domain/usecase/usecase.interface";
import IBeverageRepository from "../../repository/beverage.repository.interface";

export interface ShowBeverageUsecaseInput {
  beverageId: string
}

export default class ShowBeverageUsecase implements IUsecase {

  constructor(private beverageRepository: IBeverageRepository) {}

  async execute(input: ShowBeverageUsecaseInput): Promise<UsecaseResponse> {
    const beverage = await this.beverageRepository.findById(input.beverageId)

    if (!beverage) {
      return {
        data: null,
        status: 404
      }
    }

    return {
      status: 200,
      data: {
        id: beverage.id,
        name: beverage.name,
        image: beverage.image,
        userId: beverage.userId,
        description: beverage.description,
        category: {
          id: beverage.category.id,
          name: beverage.category.name
        }
      }
    }
  }
  
}