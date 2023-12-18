import UsecaseResponse from "../../../../@shared/domain/usecase/usecase-response";
import IUsecase from "../../../../@shared/domain/usecase/usecase.interface";
import Beverage from "../../domain/beverage/beverage.entity";
import IBeverageRepository from "../../repository/beverage.repository.interface";

export default class ListBeverageByCategoryUsecase implements IUsecase {

  constructor(private beverageRepository: IBeverageRepository) {}

  async execute(categoryId: string): Promise<UsecaseResponse> {
    const items = await this.beverageRepository.findByCategoryId(categoryId)

    const beverages = items.map(item => {
      return {
        id: item.id,
        name: item.name,
        category: item.category.name
      }
    })

    return {
      status: 200,
      data: beverages
    }
  }
  
}