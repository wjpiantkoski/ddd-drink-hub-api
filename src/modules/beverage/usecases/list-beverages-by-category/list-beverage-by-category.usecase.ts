import IUsecase from "../../../../@shared/domain/usecase/usecase.interface";
import Beverage from "../../domain/beverage/beverage.entity";
import IBeverageRepository from "../../repository/beverage.repository.interface";

export default class ListBeverageByCategoryUsecase implements IUsecase {

  constructor(private beverageRepository: IBeverageRepository) {}

  execute(categoryId: string): Promise<Beverage[]> {
    return this.beverageRepository.findByCategoryId(categoryId)
  }
  
}